<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { productsApi } from '$lib/api/products';
	import type { Product } from '$lib/api/products';

	let products = $state<Product[]>([]);

	async function loadProducts() {
		products = await productsApi.getAllProducts();
	}

	$effect(() => {
		loadProducts();
	});
</script>

<svelte:head>
	<title>NFTs Collection | NVault</title>
	<meta name="description" content="Browse our curated collection of unique NFTs. Find rare digital art pieces and exclusive collectibles." />
</svelte:head>

<PageTitle pageTitle="NFTs" />

<section class="products">
	{#each products as product}
		<ProductCard
			id={product.id}
			productTitle={product.productTitle}
			productImg={product.productImg}
			productPrice={product.productPrice}
			currency={product.currency} />
	{/each}
</section>

<style>
	.products {
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
