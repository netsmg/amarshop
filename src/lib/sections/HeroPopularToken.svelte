<script>
	import { borderAnimation } from '$lib/actions/animation';
	import Badge from '$lib/components/Badge.svelte';

	import { Eth } from '$lib/icons';
</script>

<div class="popular">
	<div class="popular__title">
		<h3>Most Popular</h3>
		<p>05 / 2022</p>
	</div>

	<a class="popular__item" href="/products/1">
		<Badge badgeText="TOP" />
		<img src="/images/nft-popular.avif" alt="" />
	</a>

	<div class="popular__info prose" use:borderAnimation>
		<h3>Interesting places in the collections and create crypto.</h3>
		<p>We have prepared a list of the most interesting virtual tokens saved on the Internet.</p>
	</div>

	<div class="popular__price">
		<p class="price__title">Current price</p>
		<div class="price__number">
			<p>18.1 ETH</p>
			<Eth />
		</div>
	</div>
</div>

<style>
	.popular {
		padding: var(--space-l) var(--space-m);

		& h3 {
			font-family: var(--font-fancy);
			font-size: var(--step-2);
		}
	}

	.popular__title {
		place-self: end;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: var(--space-l);
	}

	.popular__price {
		display: grid;
		grid-template-columns: 2fr auto;

		& .price__number {
			font-family: var(--font-fancy);
			font-size: var(--step-3);
			display: flex;
			flex-direction: row;
			gap: var(--space-s);
		}

		& .price__title {
			place-items: end;
			max-width: 300px;
		}
	}

	.popular__info {
		display: grid;
		grid-template-columns: 1fr;
		margin-bottom: var(--space-l);
		padding-bottom: var(--space-l);
		gap: var(--space-m);

		h3 {
			font-size: var(--step-1);
			max-width: 300px;
		}

		border-bottom: var(--brand-border);
	}

	@media (min-width: 992px) {
		.popular__info {
			grid-template-columns: 2fr 1fr;
		}
	}

	.popular__item {
		display: flex;
		margin-bottom: var(--space-xl);
		position: relative;

		&:hover img {
			transform: scale(1.05);
		}

		& img {
			object-fit: cover;
			width: 100%;
			height: 480px;
			max-height: 500px;
			@mixin stylish-radius;
			transition: var(--transition-bounce);
		}
	}
</style>
