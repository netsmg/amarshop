<script>
  import { db, auth } from '$lib/firebase';
  import { collection, getDocs, query, where } from 'firebase/firestore';
  import { cart } from '$lib/stores/cart';
  import { onMount } from 'svelte';

  let products = [];
  let loading = true;
  let error = null;
  let favorites = new Set();
  let imageErrors = new Set();

  // Filters
  let searchTerm = '';
  let selectedCategory = 'all';
  let priceRange = [0, 1000];
  let sortBy = 'price-asc';

  const categories = ['all', 'electronics', 'clothing', 'books', 'home', 'beauty'];

  // Load products from Firestore
  const loadProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      loading = false;
    } catch (err) {
      error = 'Failed to load products';
      loading = false;
    }
  };

  // Load favorites
  const loadFavorites = async () => {
    if (!auth.currentUser) return;
    try {
      const favRef = collection(db, 'users', auth.currentUser.uid, 'favorites');
      const snapshot = await getDocs(favRef);
      favorites = new Set(snapshot.docs.map(doc => doc.id));
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  // Add to cart with Firestore sync
  const addToCart = async (product) => {
    if (!auth.currentUser) return;
    
    try {
      await cart.addItem(product);
    } catch (err) {
      error = 'Failed to add to cart';
    }
  };

  // Toggle favorite
  const toggleFavorite = async (productId) => {
    if (!auth.currentUser) return;
    
    try {
      const favRef = doc(db, 'users', auth.currentUser.uid, 'favorites', productId);
      
      if (favorites.has(productId)) {
        await deleteDoc(favRef);
        favorites.delete(productId);
      } else {
        await setDoc(favRef, { productId, addedAt: new Date() });
        favorites.add(productId);
      }
      favorites = new Set(favorites);
    } catch (err) {
      error = 'Failed to update favorite';
    }
  };

  onMount(() => {
    loadProducts();
    auth.onAuthStateChanged(user => {
      if (user) loadFavorites();
    });
  });

  // Computed filtered products
  $: filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && 
                          product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
</script>

<svelte:head>
  <title>Products - Mcq Store</title>
  <meta name="description" content="Browse our collection of premium products" />
</svelte:head>

<div class="products-page">
  
<!-- Filters Markup -->
<div class="filters-container">
  <div class="filters-grid">
    <!-- Search Input -->
    <div class="filter-group">
      <label class="filter-label">Search Products</label>
      <input
        type="text"
        class="search-input"
        placeholder="What are you looking for?"
        bind:value={searchTerm}
      />
    </div>

    <!-- Category Select -->
    <div class="filter-group">
      <label class="filter-label">Category</label>
      <select class="select-input" bind:value={selectedCategory}>
        {#each categories as category}
          <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
        {/each}
      </select>
    </div>

    <!-- Price Range -->
    <div class="filter-group">
      <label class="filter-label">Price Range</label>
      <div class="range-filter">
        <input
          type="range"
          class="range-input"
          bind:value={priceRange[1]}
          min="0"
          max="1000"
          step="10"
        />
        <div class="range-labels">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>

    <!-- Sort By -->
    <div class="filter-group">
      <label class="filter-label">Sort By</label>
      <select class="select-input" bind:value={sortBy}>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </div>
  </div>

    <!-- Keep existing filter markup -->
  </div>

  {#if loading}
    <div class="loading">Loading products...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if filteredProducts.length === 0}
    <div class="empty-state">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      <p>No products found matching your criteria</p>
    </div>
  {:else}
    <div class="products-grid">
      {#each filteredProducts as product (product.id)}
        <article class="product-card">
          {#if product.discount}
            <div class="badge">-{product.discount}%</div>
          {/if}

          <button 
            class="favorite {favorites.has(product.id) ? 'favorited' : ''}" 
            on:click|preventDefault={() => toggleFavorite(product.id)}
            disabled={!auth.currentUser}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          <div class="image-container">
            {#if imageErrors.has(product.id)}
              <div class="image-fallback">
                <svg viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
            {:else}
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                on:error={() => imageErrors.add(product.id)}
              />
            {/if}
          </div>

          <div class="product-info">
            <h3>{product.name}</h3>
            <p class="description">{product.description}</p>
            <div class="price-container">
              {#if product.originalPrice}
                <span class="original-price">${product.originalPrice.toFixed(2)}</span>
              {/if}
              <span class="current-price">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <button 
            class="add-to-cart"
            on:click|preventDefault={() => addToCart(product)}
            disabled={!auth.currentUser}
          >
            {#if !auth.currentUser}
              Login to Purchase
            {:else}
              Add to Cart
            {/if}
          </button>
        </article>
      {/each}
    </div>
  {/if}
</div>
<!-- src/routes/products/+page.svelte -->
<style>
  :global(:root) {
    --primary: #2563eb;
    --secondary: #4f46e5;
    --background: #ffffff;
    --text: #1e293b;
    --text-light: #64748b;
    --border: #e2e8f0;
    --radius: 12px;
    --shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .products-page {
    padding: 2rem 1rem;
    max-width: 1440px;
    margin: 0 auto;
  }

  /* Filters Section */
  .filters-container {
    background: var(--background);
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    position: sticky;
    top: 1rem;
    z-index: 10;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid var(--border);
  }

  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-label {
    font-weight: 600;
    color: var(--text);
    font-size: 0.9rem;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    font-size: 1rem;
    transition: var(--transition);
    background: transparent;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .select-input {
    padding: 0.75rem 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    background: transparent;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
  }

  .range-filter {
    display: grid;
    gap: 0.5rem;
  }

  .range-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--text-light);
  }

  .range-input {
    width: 100%;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    -webkit-appearance: none;
  }

  .range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition);
  }

  .range-input::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  /* Products Grid */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
  }

  .product-card {
    position: relative;
    background: var(--background);
    border-radius: var(--radius);
    padding: 1.5rem;
    border: 1px solid var(--border);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow);
  }

  .image-container {
    position: relative;
    padding-top: 100%;
    border-radius: var(--radius);
    overflow: hidden;
    background: #f8fafc;
  }

  .product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.03);
  }

  .badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--primary);
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    z-index: 1;
  }

  .favorite-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition: var(--transition);
  }

  .favorite-button:hover {
    background: white;
    transform: scale(1.1);
  }

  .favorite-button.favorited svg {
    fill: var(--primary);
    stroke: var(--primary);
  }

  .product-info {
    display: grid;
    gap: 0.75rem;
  }

  .product-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
    margin: 0;
  }

  .product-description {
    font-size: 0.875rem;
    color: var(--text-light);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .current-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
  }

  .original-price {
    font-size: 0.875rem;
    color: var(--text-light);
    text-decoration: line-through;
  }

  .add-to-cart {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    margin-top: auto;
  }

  .add-to-cart:hover {
    opacity: 0.95;
    transform: translateY(-1px);
  }

  .add-to-cart:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }

  /* Loading and Error States */
  .loading {
    text-align: center;
    padding: 4rem;
    color: var(--text-light);
  }

  .error {
    text-align: center;
    padding: 2rem;
    background: #fee2e2;
    color: #dc2626;
    border-radius: var(--radius);
    margin: 2rem 0;
  }

  .empty-state {
    text-align: center;
    padding: 4rem;
    color: var(--text-light);
  }

  .empty-state svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    .products-page {
      padding: 1rem;
    }

    .filters-container {
      position: static;
    }

    .products-grid {
      grid-template-columns: 1fr;
    }

    .filter-group {
      flex-direction: column;
    }
  }
</style>


