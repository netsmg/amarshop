<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import ContactForm from '$lib/sections/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact Us | NVault</title>
	<meta name="description" content="Get in touch with NVault's team for support, partnerships, or general inquiries about our NFT marketplace." />
</svelte:head>

<PageTitle pageTitle="Contact" />

<section class="contact">
	<div class="contact__title">
		<p>If you have a question, send it to us and we will reply to you as soon as possible.</p>
	</div>
	<ContactForm />
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
