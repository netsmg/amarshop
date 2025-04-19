<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqForm from '$lib/sections/DashboardSection.svelte';
</script>

<svelte:head>
	<title>Dashboard | Mcq store</title>
	<meta name="description" content="Login or Register" />
</svelte:head>

<PageTitle pageTitle="Dashboard" />

<section class="contact">
	
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
