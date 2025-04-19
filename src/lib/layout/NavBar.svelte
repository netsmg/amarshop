<script>
	import Logo from '$lib/components/Logo.svelte';
	import { Menu, Xmark } from '$lib/icons';
	import { borderAnimation } from '$lib/actions/animation';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { page } from '$app/state';

	// Using $state rune for reactive state
	let menuVisible = $state(false);

	// Using $derived rune for computed values
	let currentPath = $derived(page.url.pathname);

	function toggleMenu() {
		menuVisible = !menuVisible;
		if (browser) {
			document.body.style.overflow = menuVisible ? 'hidden' : 'auto';
		}
	}

	onDestroy(() => {
		if (browser) {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<header>
	<nav class="nav">
		<div use:borderAnimation class="nav__left">
			<a href="/" class="left__brand">
				<Logo width="24" height="24"  />
				<div>MCQ STORE</div>
			</a>
		</div>
		<div use:borderAnimation class="nav__mid">NetSMG</div>
		<div use:borderAnimation class="nav__right">
			<a class="nav__link" class:active={currentPath === '/'} href="/">Home</a>
 <a class="nav__link" class:active={currentPath === '/auth'} href="/auth">Auth</a>
<a class="nav__link" class:active={currentPath === '/exams'} href="/exams">Quizzes</a>
			<a class="nav__link" class:active={currentPath === '/about'} href="/about">About</a>
			<a class="nav__link" class:active={currentPath === '/contact'} href="/contact">Contact</a>

			<button transition:fade={{ duration: 300 }} onclick={toggleMenu} class="nav__hamburger">
				{#if menuVisible}
					<Xmark />
				{:else}
					<Menu />
				{/if}
			</button>
		</div>
	</nav>
</header>

<div class="fullscreen-menu" class:show={menuVisible}>
	<a onclick={toggleMenu} class="nav__link--mobile" class:active={currentPath === '/'} href="/"
		>Home</a>
<a
		onclick={toggleMenu}
		class="nav__link--mobile"
		class:active={currentPath === '/auth'}
		href="/auth">Auth</a>
	<a
		onclick={toggleMenu}
		class="nav__link--mobile"
		class:active={currentPath === '/exams'}
		href="/exams">Quizzes</a>

	<a
		onclick={toggleMenu}
		class="nav__link--mobile"
		class:active={currentPath === '/about'}
		href="/about">About</a>
	<a
		onclick={toggleMenu}
		class="nav__link--mobile"
		class:active={currentPath === '/contact'}
		href="/contact">Contact</a>
</div>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 9999;
		isolation: isolate;
	}

	.nav {
		display: grid;
		grid-template-columns: 2fr 1fr;
		width: 100%;
		background-color: var(--background-50);;
		height: 64px;
	}

	@media (min-width: 992px) {
		.nav {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.nav__left {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-inline: var(--space-m);
		height: 100%;
		border-bottom: var(--brand-border);
	}

	@media (min-width: 992px) {
		.nav__left {
			border-right: var(--brand-border);
		}
	}

	.left__brand {
		font-size: var(--step-2);
		font-family: var(--font-fancy);

		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-s);

		@mixin text-trim;
	}

	.left__info {
		text-align: right;
	}

	.nav__mid {
		border-right: var(--brand-border);
		border-bottom: var(--brand-border);

		padding-inline: var(--space-m);
		height: 100%;
		display: none;
	}

	@media (min-width: 992px) {
		.nav__mid {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: end;
		}
	}

	.nav__right {
		padding-inline: var(--space-m);

		border-bottom: var(--brand-border);
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: var(--space-m);
		grid-template-columns: 1fr;
		align-items: center;
		justify-content: end;
	}

	@media (min-width: 992px) {
		.nav__right {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.nav__link {
		display: none;
		text-align: right;
	}

	@media (min-width: 992px) {
		.nav__link {
			display: block;
		}
	}

	.fullscreen-menu {
		position: fixed;
		top: 64px;
		right: 0;
		width: 100%;
		height: calc(100vh - 64px); /* Subtract navbar height */
		background-color: var(--primary-500);
		color: var(--black);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: end;

		z-index: 9999;

		text-transform: uppercase;
		transform: translateX(100%);
		/* Use the custom bounce transition from your CSS variables */
		transition: transform var(--transition-bounce);
	}

	.fullscreen-menu.show {
		transform: translateX(0);
	}

	.nav__link--mobile {
		display: block;
		font-size: var(--step-4);
		font-family: var(--font-fancy);
		transition: color var(--transition-bounce);
		padding: var(--space-m) var(--space-m);
		width: 100%;
		text-align: right;
	}

	/* Add highlight for active mobile link */
	.nav__link--mobile.active {
		background: var(--background-50);
		color: var(
			--background-950
		); /* Using the light background color to contrast with primary-500 background */
	}

	@media (min-width: 992px) {
		.fullscreen-menu {
			display: none;
		}
		.nav__link--mobile {
			display: none;
		}
		.nav__hamburger {
			display: none;
		}
	}

	.nav__hamburger {
		font-size: var(--step-2);
	}

	/* Add these styles */
	.nav__link {
		position: relative;
		padding-bottom: 2px;
	}

	.nav__link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--primary-500);
		transition: width var(--transition-bounce);
	}

	.nav__link.active::after {
		width: 100%;
	}
</style>
