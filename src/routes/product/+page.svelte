<script lang="ts">
	import { onMount } from 'svelte';
	import { db, auth } from '$lib/firebase'; // তোর ফায়ারবেস ইনিট
	import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { writable, derived } from 'svelte/store';

	const products = writable([]);
	const filtered = writable([]);
	const user = writable(null);
	const favorites = writable<string[]>([]);

	// Filters
	let category = '';
	let priceRange = [0, 1000];
	let inStockOnly = false;
	let favoritesOnly = false;
	let sortBy = 'createdAt';

	onMount(async () => {
		const authInst = getAuth();
		onAuthStateChanged(authInst, u => {
			user.set(u);
			if (u) loadFavorites(u.uid);
		});
		await loadProducts();
	});

	async function loadProducts() {
		const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
		const snapshot = await getDocs(q);
		const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		products.set(items);
		filterProducts();
	}

	async function loadFavorites(uid: string) {
		const snap = await getDocs(collection(db, `users/${uid}/favorites`));
		favorites.set(snap.docs.map(doc => doc.id));
	}

	function toggleFavorite(productId: string) {
		favorites.update(current => {
			if (!user) return current;
			const idx = current.indexOf(productId);
			if (idx >= 0) {
				// remove
				current.splice(idx, 1);
			} else {
				current.push(productId);
			}
			return [...current];
		});
	}

	function filterProducts() {
		products.subscribe(items => {
			filtered.set(items.filter(p =>
				(!category || p.category === category) &&
				p.price >= priceRange[0] && p.price <= priceRange[1] &&
				(!inStockOnly || p.stock > 0) &&
				(!favoritesOnly || $favorites.includes(p.id))
			));
		});
	}

	$: filterProducts();
</script>

<!-- UI -->
<div class="p-4 space-y-4">
	<!-- Filters -->
	<div class="flex flex-wrap gap-4 items-center">
		<select bind:value={category} class="border rounded p-2">
			<option value="">All Categories</option>
			<option value="electronics">Electronics</option>
			<option value="books">Books</option>
		</select>

		<input type="range" min="0" max="1000" step="10" bind:value={priceRange[1]} class="w-40" />
		<span class="text-sm">Up to ${priceRange[1]}</span>

		<label><input type="checkbox" bind:checked={inStockOnly} /> In Stock</label>
		<label><input type="checkbox" bind:checked={favoritesOnly} /> Favorites</label>

		<select bind:value={sortBy} class="border rounded p-2">
			<option value="createdAt">Newest</option>
			<option value="priceLow">Price: Low to High</option>
			<option value="priceHigh">Price: High to Low</option>
		</select>
	</div>

	<!-- Products Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
		{#each $filtered as product}
			<div class="border rounded-lg p-4 shadow hover:shadow-md transition relative">
				<img src={product.image} alt={product.name} class="w-full h-40 object-cover rounded mb-2" />
				<h2 class="text-lg font-bold">{product.name}</h2>
				<p class="text-sm text-gray-600">{product.description}</p>
				<div class="flex justify-between items-center mt-2">
					<span class="font-semibold">${product.price}</span>
					<button on:click={() => toggleFavorite(product.id)}>
						{$favorites.includes(product.id) ? '♥' : '♡'}
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
