<script>
	import { borderAnimation } from '$lib/actions/animation';
	import Logo from '$lib/components/Logo.svelte';
	import { SendMail } from '$lib/icons';
</script>

<footer class="footer">
	<div class="footer__cta">
		<p class="cta__text textTrim">Get in touch</p>

		<a href="/contact" class="cta__btn btn">
			<SendMail />
			<p>Contact now</p>
		</a>
	</div>

	<div class="footer__copyright">
		<div use:borderAnimation class="copyright__text">
			<p>Demonstration website for a beautiful NFT shop.</p>
			<p>Created by Khoa Nguyen</p>
			<p>wentallout ©2025 All rights reserved</p>
		</div>

		<div class="copyright__brand">
			<Logo />
			<div class="textTrim">NVAULT</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		display: grid;
		grid-template-columns: 1fr;

		color: var(--text-900);
		align-items: center;
		position: relative;

		overflow: hidden;

		background: linear-gradient(
			0deg,
			color-mix(in srgb, var(--primary-500), var(--background-100) 70%) 0%,
			var(--background-100) 20%
		);
	}

	.footer__cta {
		padding: var(--space-2xl) var(--space-m);
		height: 100%;

		padding-top: calc(var(--space-2xl) * 2);
	}

	.footer__copyright {
		padding: var(--space-2xl) var(--space-m);
		height: 100%;
		padding-top: calc(var(--space-2xl) * 2);
	}

	@media (min-width: 992px) {
		.footer {
			grid-template-columns: 2fr 1fr;
		}

		.footer__cta {
			border-right: var(--brand-border);
		}
	}

	.cta__text {
		font-size: var(--step-5);
		font-family: var(--font-fancy);
		margin-bottom: var(--space-m);
	}

	.cta__btn {
		border: var(--brand-border);
		color: var(--text-900);
	}

	.footer__copyright {
		display: flex;
		flex-direction: column;
	}

	.copyright__text {
		border-bottom: var(--brand-border);
		padding-bottom: var(--space-m);
		margin-bottom: var(--space-m);
	}

	.copyright__brand {
		font-size: var(--step-2);
		font-family: var(--font-fancy);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-xs);
		height: fit-content;
	}
</style>
