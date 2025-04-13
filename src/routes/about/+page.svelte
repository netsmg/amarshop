<script>
	import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
	import PageTitle from '$lib/components/PageTitle.svelte';

	const abouts = [
		{
			image: '/images/about-1.png',
			heading: 'Who We Are',
			description:
				'NVAULT is where digital art meets opportunity. We empower creators and collectors to trade NFTs in a secure, dynamic space.'
		},
		{
			image: '/images/about-2.jpeg',
			heading: 'What We Do',
			description:
				'Buy, sell, and trade NFTs easily with: Exclusive drops Real-time auctions Simple minting tools Secure blockchain transactions'
		},
		{
			image: '/images/about-3.jpeg',
			heading: 'Why Choose Us',
			description:
				'Verified Creators: Authentic, high-quality art User-Friendly Design: Easy for anyone to use Future-Ready Tech: Always innovating Join Nvault — shaping the future of digital ownership.'
		}
	];
</script>

<svelte:head>
	<title>About Us | NVault</title>
	<meta name="description" content="Learn about NVault's mission to revolutionize the NFT marketplace with innovative digital art trading." />
</svelte:head>

<PageTitle pageTitle="About Us" />

<section class="about" use:borderAnimation>
	{#each abouts as { image, heading, description }}
		<section use:revealAnimation>
			<img height="273" loading="lazy" class="about__img" src={image} alt="" />
			<h2 use:decodeAnimation class="about__heading">{heading}</h2>
			<p class="prose">{description}</p>
		</section>
	{/each}
</section>

<style>
	.about {
		display: grid;
		grid-template-columns: 1fr;
		border-bottom: var(--brand-border);

		& .about__heading {
			font-family: var(--font-fancy);
			font-size: var(--step-3);
			line-height: var(--leading-none);
			align-self: center;
		}
	}

	@media (min-width: 992px) {
		.about {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.about section {
			display: grid;
			grid-template-columns: subgrid;
			grid-template-rows: auto 1fr 1fr;
			align-items: start;
		}
	}

	.about section p {
		display: block;
	}

	.about__img {
		max-height: 30dvh;
		object-fit: cover;
		width: 100%;
		margin-bottom: var(--space-s);

		filter: grayscale(1);

		@mixin stylish-radius;
	}

	.about section {
		padding: var(--space-m) var(--space-m);
		border-right: var(--brand-border);
	}
</style>
