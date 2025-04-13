<script lang="ts">
	import { borderAnimation, decodeAnimation } from '$lib/actions/animation';
	import { Eth } from '$lib/icons';
	import { Image } from '@unpic/svelte';

	let {
		id = 1,
		productTitle = 'Shape',
		productImg = '/images/product-1.avif',
		productPrice = 100,
		currency = 'ETH'
	} = $props();

	let productLink = $derived(`/products/${id}`);
</script>

<a class="link" href={productLink}>
	<article class="product" use:borderAnimation>
		<div class="product__thumbnail dot-pattern">
			<Image
				class="product__img"
				src={productImg}
				layout="fullWidth"
				loading="lazy"
				alt="image of {productTitle}" />
		</div>

		<div class="product__info">
			<h3 use:decodeAnimation>{productTitle}</h3>
			<div class="info__price">
				<p>
					{productPrice}
					{currency}
				</p>
				<Eth />
			</div>
		</div>
	</article>
</a>

<style>
	.link {
		display: contents;
		isolation: isolate;
	}
	.product {
		border-bottom: var(--brand-border);
		border-right: var(--brand-border);
		display: grid;
		grid-template-rows: subgrid;
		grid-template-columns: minmax(50px, 100px) 1fr;
		overflow: hidden;
		transition: var(--transition-bounce);

		&:hover {
			color: var(--primary-500);

			& img {
				transform: scale(1.2);
			}
		}
	}

	@media (min-width: 992px) {
		.product {
			grid-template-columns: minmax(150px, 1fr) 1fr 1fr;
		}
	}

	.product__img {
		transform: scale(1.2);
	}

	.product__thumbnail {
		border-right: var(--brand-border);

		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 240px;

		& img {
			display: block;
			object-fit: cover;
			transition: var(--transition-bounce);
			overflow: visible;
		}
	}

	.product__info {
		font-family: var(--font-fancy);
		font-size: var(--step-2);

		/* FLEX */
		display: flex;
		flex-direction: column;
		/* --- */

		padding: var(--space-s) var(--space-m);
		height: 100%;
		width: 100%;

		line-height: var(--leading-normal);

		& h3 {
			word-break: break-all;
		}
	}

	@media (min-width: 992px) {
		.product__info {
			font-size: var(--step-3);
			padding: var(--space-l) var(--space-xl);
		}
	}

	.info__price {
		font-size: var(--step-0);
		font-family: var(--font-normal);
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
		align-items: center;
		color: var(--primary-500);
	}
</style>
