
<script>
  import ProductCard from '$lib/components/product/ProductsCard.svelte';
  import { page } from '$app/stores';
  

  export let data;

  let searchTerm = '';
  let selectedCategory = 'all';
  let priceRange = [0, 1000];
  let sortBy = 'price-asc';

  // Available categories (you might want to fetch these from Firestore)
  const categories = [
    'all',
    'electronics',
    'clothing',
    'books',
    'home',
    'beauty'
  ];

  // Computed filtered products
  $: filteredProducts = data.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           product.category === selectedCategory;
    
    const matchesPrice = product.price >= priceRange[0] && 
                        product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
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
  <div class="filters-container">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        bind:value={searchTerm}
        class="search-input"
      />
      <svg class="search-icon" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </div>

    <div class="filter-group">
      <select bind:value={selectedCategory} class="category-select">
        {#each categories as category}
          <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
        {/each}
      </select>

      <select bind:value={sortBy} class="sort-select">
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </div>

    <div class="price-filter">
      <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
      <input
        type="range"
        bind:value={priceRange[1]}
        min="0"
        max="1000"
        step="10"
        class="range-input"
      />
    </div>
  </div>

  {#if filteredProducts.length === 0}
    <div class="empty-state">
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <p>No products found matching your criteria</p>
    </div>
  {:else}
    <div class="products-grid">
      {#each filteredProducts as product (product.id)}
        <div>
          <ProductCard {product} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .products-page {
    padding: 2rem 1rem;
    max-width: 1440px;
    margin: 0 auto;
  }

  .filters-container {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(10px);
  }

  .search-bar {
    position: relative;
    max-width: 500px;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--radius);
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--text-secondary);
  }

  .filter-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  select {
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: white;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .price-filter {
    display: grid;
    gap: 0.5rem;
  }

  .range-input {
    width: 100%;
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    outline: none;
    -webkit-appearance: none;
  }

  .range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: var(--accent);
    border-radius: 50%;
    cursor: pointer;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem 1rem;
    text-align: center;
    color: var(--text-secondary);
  }

  .empty-state svg {
    width: 48px;
    height: 48px;
    fill: var(--text-secondary);
  }

  @media (max-width: 640px) {
    .products-page {
      padding: 1rem 0.5rem;
    }

    .products-grid {
      grid-template-columns: 1fr;
    }

    .filter-group {
      flex-direction: column;
    }
  }
</style>
