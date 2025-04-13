<script>
	import { borderAnimation,decodeAnimation } from '$lib/actions/animation';
	import { ArrowRight } from '$lib/icons';
	import HeroPopularToken from './HeroPopularToken.svelte';
</script>

<section class="hero">
	<div class="hero__cta" use:borderAnimation>
		<div class="cta__title" use:decodeAnimation>Own The Future</div>
		<p use:decodeAnimation class="cta__desc prose">
			Exclusive digital masterpieces that turn pixels into profit. Join the elite collectors shaping tomorrow's art market.
		</p>
		<a class="cta__btn btn" href="/products">
			<ArrowRight />
			<p>View NFTs</p>
		</a>
		<div class="cta__img">
			<img class="" src="/images/nft-1.avif" alt="" />

			<p class="prose">
				Limited drops. Unlimited potential. Each NFT in our vault is handpicked to maximize both artistic value and investment returns.
			</p>
		</div>
	</div>

	<HeroPopularToken />
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1fr;
		border-bottom: var(--brand-border);
	}

	@media (min-width: 992px) {
		.hero {
			grid-template-columns: 2fr 1fr;
		}
	}

	.hero__cta {
		display: grid;

		grid-template-areas:
			'cta__title'
			'cta__desc'
			'cta__btn'
			'cta__img';

		padding: var(--space-l) var(--space-m);
	}

	@media (min-width: 992px) {
		.hero__cta {
			border-right: var(--brand-border);
			grid-template-areas:
				'cta__title cta__desc'
				'cta__btn cta__btn'
				'cta__img cta__img';
		}
	}

	.cta__title {
		grid-area: cta__title;
		margin-bottom: var(--space-2xl);
		font-size: var(--step-5);
		font-family: var(--font-fancy);
		line-height: var(--leading-none);
	}

	.cta__desc {
		grid-area: cta__desc;
		width: 100%;
		max-width: 30ch;
		align-self: baseline;
		display: flex;
		text-wrap: pretty;
		margin-bottom: var(--space-m);
	}

	.cta__img {
		grid-area: cta__img;

		& img {
			width: 100%;
			height: 460px;
			object-fit: cover;
			margin-bottom: var(--space-l);

			@mixin stylish-radius;
		}

		& p {
			max-width: 60ch;
		}
	}

	.cta__btn {
		grid-area: cta__btn;
		background-color: var(--primary-500);
		color: var(--black);

		margin-bottom: var(--space-2xl);
		width: 100%;
		display: flex;
	}
</style>
