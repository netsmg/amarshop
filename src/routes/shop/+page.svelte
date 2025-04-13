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
	
	<McqCard
    question="What is the capital of France?"
    options={["London", "Berlin", "Paris", "Madrid"]}
    correctAnswer={2}
    explanation="Paris is the capital and most populous city of France."
/>
<McqCard
    question="What is the capital of France?"
    options={["London", "Berlin", "Paris", "Madrid"]}
    correctAnswer={2}
    explanation="Paris is the capital and most populous city of France."
/>

</section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
