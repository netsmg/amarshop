<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/McqCard.svelte';
</script>

<svelte:head>
	<title>Shop| Amar Shop</title>
	<meta name="description" content="Give mcq" />
</svelte:head>

<PageTitle pageTitle="Shop" />

<section class="contact">
	
	<McqCard />
</section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
