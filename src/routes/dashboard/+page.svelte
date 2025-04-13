<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqForm from '$lib/sections/McqForm.svelte';
</script>

<svelte:head>
	<title>Auth | Amar Shop</title>
	<meta name="description" content="Login or Register" />
</svelte:head>

<PageTitle pageTitle="Dashboard" />

<section class="contact">
	<div class="contact__title">
		<p>Start practicing mcq.</p>
	</div>
	<McqForm />
</section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}

	.contact__title {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-xl);
		justify-content: start;
		align-items: center;
		margin-bottom: var(--space-xl);
	}

	.contact__title h2 {
		font-size: var(--step-5);
		font-family: var(--font-fancy);

		line-height: var(--leading-none);
	}

	.contact__title p {
		display: block;
		max-width: 60ch;
	}
</style>
