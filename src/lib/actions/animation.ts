// src/lib/borderAnimation.js
import { gsap } from 'gsap'; // Main GSAP library for animations
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Plugin for scroll-based animations
import { TextPlugin } from 'gsap/dist/TextPlugin'; // Plugin for text animations

// Register GSAP plugins so they're available for use
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Border Animation: Creates a drawing effect for borders
export function borderAnimation(
	node: HTMLElement, // The DOM element to animate
	{
		duration = 1.5, // How long the animation takes
		ease = 'power2.out', // Animation easing function
		start = 'top 90%' // When to trigger (element's top hits 90% of viewport)
	} = {}
) {
	// Find all child elements that might have borders
	const childElements = node.querySelectorAll('*');

	childElements.forEach((child) => {
		// Check if element has our custom border property
		const border = getComputedStyle(child).getPropertyValue('--brand-border');
		if (border) {
			// Initialize border progress to 0
			gsap.set(node, { '--border-progress': 0 });

			// Create the animation
			gsap.to(node, {
				'--border-progress': 1, // Animate from 0 to 1
				duration,
				ease,
				scrollTrigger: {
					trigger: node, // Element that triggers animation
					start, // When to start
					toggleActions: 'play none none none' // Play once when triggered
				},
				// Update border gradient on each frame
				onUpdate: () => {
					// Create gradient effect using CSS border-image
					node.style.borderImage = `linear-gradient(
						to right, 
						var(--background-900) ${gsap.getProperty(node, '--border-progress') * 100}%, 
						transparent 0%
					)`;
					node.style.borderImageSlice = '1';
				}
			});
		}
	});

	// Cleanup function for when element is destroyed
	return {
		destroy() {
			const trigger = ScrollTrigger.getById(node.id);
			if (trigger) trigger.kill();
		}
	};
}

// Decode Animation: Creates a Matrix-style text scramble effect
export function decodeAnimation(
	node: HTMLElement, // The text element to animate
	{
		text = node.textContent, // Text to animate, defaults to element's content
		duration = 0.2, // Animation duration
		scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+=-' // Characters to use for scramble effect
	} = {}
) {
	// Safety check
	if (!node || !text) {
		return;
	}

	// Create a paused timeline for the scramble animation
	let scramble = gsap.timeline({ paused: true });

	// Setup the scramble animation
	scramble.to(node, {
		duration,
		ease: 'none',
		onUpdate() {
			const progress = this.progress(); // Get current animation progress (0 to 1)
			// Generate scrambled text
			let decoded = text
				.split('')
				.map((char) =>
					char === ' '
						? ' ' // Preserve spaces
						: Math.random() > progress // Randomly reveal characters based on progress
							? scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
							: char
				)
				.join('');
			node.innerText = decoded; // Update the text
		}
	});

	// Create scroll trigger for the animation
	ScrollTrigger.create({
		trigger: node,
		start: 'top 60%', // Start when element's top hits 60% of viewport
		onEnter: () => {
			scramble.restart(); // Play animation when scrolled into view
		},
		once: true // Only play once
	});

	// Cleanup function
	return {
		destroy() {
			scramble.kill();
			const trigger = ScrollTrigger.getById(node.id);
			if (trigger) {
				trigger.kill();
			}
		}
	};
}

type Direction = 'left' | 'right' | 'top' | 'bottom';

export function revealAnimation(
	node: HTMLElement,
	params?: Direction // Optional param
) {
	// Default to 'bottom' if no param is passed
	const direction = params || 'bottom';

	let x = 0;
	let y = 0;

	switch (direction) {
		case 'left':
			x = -50;
			break;
		case 'right':
			x = 50;
			break;
		case 'top':
			y = -50;
			break;
		case 'bottom':
		default:
			y = 50;
			break;
	}

	gsap.from(node, {
		opacity: 0,
		x,
		y,
		duration: 1,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: node,
			start: 'top 80%',
			toggleActions: 'play none none none'
		}
	});

	return {
		destroy() {
			ScrollTrigger.getById(node)?.kill();
		}
	};
}

