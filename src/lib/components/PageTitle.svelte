<script>
	import { decodeAnimation } from '$lib/actions/animation';

	let { pageTitle, pageDesc = '' } = $props();
</script>

<div class="title">
	{#if pageTitle}
		<h1 use:decodeAnimation={{ text: pageTitle, duration: 0.3 }}>{pageTitle}</h1>
	{/if}

	{#if pageDesc !== ''}
		<p>{pageDesc}</p>
	{/if}
</div>

<style>
	.title {
		border-bottom: var(--brand-border);
		padding-block: var(--space-xs);
		padding-inline: var(--space-m);
		color: var(--text-900);
	}

	.title h1 {
		font-family: var(--font-fancy);
		font-size: var(--step-2);
		text-transform: uppercase;
	}

	.title p {
		padding: var(--space-xs) var(--space-m);
	}
</style>
