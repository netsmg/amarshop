<script>
  import { cart } from '$lib/stores/cart';
  import { user } from '$lib/stores/auth';
  import { db } from '$lib/firebase';
  import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
  
  export let product;
  
  let isHovered = false;
  let isFavorited = false;
  let imageError = false;
  let loading = false;
  let error = null;

  // Check favorite status
  const checkFavorite = async () => {
    if (!$user) return;
    try {
      const favRef = doc(db, 'users', $user.uid, 'favorites', product.id);
      const snapshot = await getDoc(favRef);
      isFavorited = snapshot.exists();
    } catch (err) {
      console.error('Favorite check error:', err);
    }
  };

  // Handle favorite toggle
  const toggleFavorite = async () => {
    if (!$user) return;
    try {
      const favRef = doc(db, 'users', $user.uid, 'favorites', product.id);
      if (isFavorited) {
        await deleteDoc(favRef);
      } else {
        await setDoc(favRef, {
          productId: product.id,
          addedAt: new Date().toISOString()
        });
      }
      isFavorited = !isFavorited;
    } catch (err) {
      error = 'Failed to update favorite';
      console.error('Favorite error:', err);
    }
  };

  // Add to cart with Firebase sync
  const addToCart = async () => {
    if (!$user) return;
    loading = true;
    error = null;
    try {
      await cart.addItem(product);
    } catch (err) {
      error = 'Failed to add to cart';
      console.error('Cart error:', err);
    } finally {
      loading = false;
    }
  };

  // Check favorite status when user changes
  $: $user && checkFavorite();
</script>

<div class="card-container" on:mouseenter={() => isHovered = true} on:mouseleave={() => isHovered = false}>
  <article class="product-card" class:active={isHovered}>
    {#if product.discount}
      <div class="badge">-{product.discount}%</div>
    {/if}
    
    <button class="favorite" on:click|preventDefault={toggleFavorite} disabled={!$user}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill={isFavorited ? 'var(--accent)' : 'none'}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>

    <div class="image-container">
      {#if imageError}
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
          class="product-image"
          on:error={() => imageError = true}
        />
      {/if}
    </div>

    <div class="product-info">
      <h3 class="product-title">{product.name}</h3>
      <p class="product-description">{product.description}</p>
      
      <div class="price-container">
        {#if product.originalPrice}
          <span class="original-price">${product.originalPrice.toFixed(2)}</span>
        {/if}
        <span class="current-price">${product.price.toFixed(2)}</span>
      </div>
    </div>

    {#if error}
      <div class="error">{error}</div>
    {/if}

    <button 
      class="add-to-cart" 
      on:click|preventDefault={addToCart} 
      disabled={!$user || loading}
    >
      {#if !$user}
        Login to Purchase
      {:else if loading}
        <span class="spinner" />
      {:else}
        Add to Cart
      {/if}
    </button>
  </article>
</div>

<style>
  /* Previous styles remain the same */
  :global(:root) {
    --card-bg: #ffffff;
    --text-primary: #1a1a1a;
    --text-secondary: #4d4d4d;
    --accent: #0066ff;
    --radius: 12px;
    --shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  }
  .image-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    display: grid;
    place-items: center;
  }

  .image-fallback svg {
    width: 40%;
    height: 40%;
    fill: var(--text-secondary);
    opacity: 0.3;
  }

  .error {
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    text-align: center;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }


  

  .card-container {
    position: relative;
    padding: 4px;
  }

  .product-card {
    position: relative;
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 1rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .product-card.active {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    position: relative;
    padding-top: 100%;
    border-radius: var(--radius);
    overflow: hidden;
    background: #f8f8f8;
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
    top: 12px;
    left: 12px;
    background: var(--accent);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    z-index: 1;
  }

  .favorite {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    backdrop-filter: blur(
4px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .favorite:hover {
    background: white;
    transform: scale(1.1);
  }

  .favorite svg {
    width: 20px;
    height: 20px;
    stroke: var(--text-primary);
    stroke-width: 2px;
  }

  .product-info {
    display: grid;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  .product-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .product-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-container {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-top: 0.5rem;
  }

  .current-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .original-price {
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-decoration: line-through;
  }

  .add-to-cart {
    width: 100%;
    padding: 0.75rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .add-to-cart:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .add-to-cart:disabled {
    background: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    .product-card {
      gap: 0.75rem;
      padding: 0.75rem;
    }

    .product-title {
      font-size: 1rem;
    }

    .current-price {
      font-size: 1.1rem;
    }
  }
</style>
