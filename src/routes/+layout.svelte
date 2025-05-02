<script> 
        import BgDeco from '$lib/components/BgDeco.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import NavBar from '$lib/layout/NavBar.svelte';
	import '@fontsource/russo-one';
	import '@fontsource-variable/sora';

	import '$lib/styles/global.css';
	let { children } = $props();

	import { setupViewTransition } from 'sveltekit-view-transition';

	setupViewTransition();

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);
</script>

<NavBar />
<main class=""> 
<BgDeco />
	{@render children?.()}
</main>

<Footer />

<style>
	main {
		/* min-height: 100dvh; */
	}
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
