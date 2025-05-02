<!-- src/routes/admin/+page.svelte -->
<script>
  import { db, storage } from '$lib/firebase';
  import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
  import { user } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let products = [];
  let loading = true;
  let error = null;
  let uploadProgress = 0;

  // Form fields
  let formData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    originalPrice: null,
    images: []
  };

  let editMode = false;
  let currentProductId = null;

  // Check admin status
  $: isAdmin = $user?.customClaims?.admin || false;

  // Load products
  const loadProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  };

  // Handle image upload
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    error = null;
    
    try {
      if (!formData.name || !formData.price) {
        throw new Error('Name and price are required');
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        createdAt: new Date().toISOString()
      };

      if (editMode) {
        await updateDoc(doc(db, 'products', currentProductId), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      error = err.message;
    }
  };

  // Handle image uploads
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    try {
      const uploads = Array.from(files).map(file => uploadImage(file));
      const urls = await Promise.all(uploads);
      formData.images = [...formData.images, ...urls];
    } catch (err) {
      error = err.message;
    }
  };

  // Edit product
  const editProduct = (product) => {
    editMode = true;
    currentProductId = product.id;
    formData = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category || '',
      originalPrice: product.originalPrice || null,
      images: product.images || []
    };
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        await loadProducts();
      } catch (err) {
        error = err.message;
      }
    }
  };

  // Reset form
  const resetForm = () => {
    formData = {
      name: '',
      description: '',
      price: 0,
      category: '',
      originalPrice: null,
      images: []
    };
    editMode = false;
    currentProductId = null;
  };

  onMount(() => {
    if (!isAdmin) goto('/');
    loadProducts();
  });
</script>

{#if !isAdmin}
  <div class="unauthorized">
    <h2>Unauthorized Access</h2>
    <p>You don't have permission to view this page</p>
  </div>
{:else}
  <div class="admin-page">
    <h1>Product Management</h1>

    <form on:submit={handleSubmit} class="product-form">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input
          id="name"
          type="text"
          bind:value={formData.name}
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Price ($)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            bind:value={formData.price}
            required
          />
        </div>

        <div class="form-group">
          <label for="originalPrice">Original Price ($)</label>
          <input
            id="originalPrice"
            type="number"
            step="0.01"
            bind:value={formData.originalPrice}
          />
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" bind:value={formData.category}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          bind:value={formData.description}
          rows="4"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Images</label>
        <div class="image-upload">
          <input
            type="file"
            multiple
            accept="image/*"
            on:change={handleImageUpload}
          />
          {#if uploadProgress > 0}
            <progress value={uploadProgress} max="100">{uploadProgress}%</progress>
          {/if}
        </div>
        
        <div class="image-previews">
          {#each formData.images as image, index (index)}
            <div class="image-preview">
              <img src={image} alt="Preview {index + 1}" />
              <button
                type="button"
                on:click|preventDefault={() => formData.images.splice(index, 1)}
              >×</button>
            </div>
          {/each}
        </div>
      </div>

      {#if error}
        <div class="error-message">{error}</div>
      {/if}

      <div class="form-actions">
        <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
        {#if editMode}
          <button type="button" on:click={resetForm}>Cancel</button>
        {/if}
      </div>
    </form>

    <div class="product-list">
      <h2>Existing Products</h2>
      
      {#if loading}
        <div class="loading">Loading products...</div>
      {:else if products.length === 0}
        <div class="empty">No products found</div>
      {:else}
        <div class="products-grid">
          {#each products as product (product.id)}
            <div class="product-item">
              <div class="product-header">
                <h3>{product.name}</h3>
                <div class="product-actions">
                  <button on:click|preventDefault={() => editProduct(product)}>Edit</button>
                  <button on:click|preventDefault={() => deleteProduct(product.id)}>Delete</button>
                </div>
              </div>
              <p>Price: ${product.price.toFixed(2)}</p>
              {#if product.images?.[0]}
                <img src={product.images[0]} alt={product.name} class="product-thumbnail" />
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  :root {
  --card-bg: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #4d4d4d;
  --accent: #0066ff;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
}


  .admin-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .product-form {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-bottom: 3rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--radius);
    font-size: 1rem;
  }

  .image-upload {
    position: relative;
    margin-bottom: 1rem;
  }

  .image-upload input[type="file"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .image-upload > div {
    border: 2px dashed rgba(0, 0, 0, 0.1);
    padding: 1rem;
    text-align: center;
    border-radius: var(--radius);
  }

  .image-previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .image-preview {
    position: relative;
    padding-top: 100%;
    border-radius: var(--radius);
    overflow: hidden;
  }

  .image-preview img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-preview button {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(255, 0, 0, 0.8);
    border: none;
    color: white;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  button:hover {
    opacity: 0.9;
  }

  .products-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .product-item {
    background: var(--card-bg);
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .product-actions {
    display: flex;
    gap: 0.5rem;
  }

  .product-thumbnail {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-top: 1rem;
  }

  .error-message {
    color: #dc3545;
    padding: 1rem;
    background: #f8d7da;
    border-radius: var(--radius);
    margin: 1rem 0;
  }

  .unauthorized {
    text-align: center;
    padding: 4rem 1rem;
  }
</style>
