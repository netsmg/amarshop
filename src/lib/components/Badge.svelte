<script>
	let { badgeText } = $props();
</script>

<div class="badge">
	<p>
		{badgeText}
	</p>
</div>

<style>
	.badge {
		position: absolute;
		inset: 0;
		top: -10%;
		left: 50%;
		transform: translateX(-50%);
		width: 146px;
		height: 146px;

		background-image: url('/images/spiky-badge.svg');
		background-repeat: no-repeat;
		z-index: 2;

		display: grid;
		place-items: center;

		animation: spin 5s linear infinite;

		color: var(--black);
	}

	.badge p {
		font-family: var(--font-fancy);
		font-size: var(--step-1);
		z-index: 3;
	}

	@keyframes spin {
		from {
			transform: translateX(-50%) rotate(0deg);
		}
		to {
			transform: translateX(-50%) rotate(360deg);
		}
	}
</style>
