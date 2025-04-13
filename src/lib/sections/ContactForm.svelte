<script>
	import { collection, addDoc } from 'firebase/firestore';
	import { borderAnimation } from '$lib/actions/animation';
	import { SendDiagonal } from '$lib/icons';
	import { db } from '$lib/firebase'; // Make sure you have your Firebase app initialized

	let form;
	let statusMessage = '';
	let isSubmitting = false;
	
	async function handleSubmit(event) {
		event.preventDefault();
		isSubmitting = true;
		statusMessage = '';

		const formData = new FormData(form);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			phone: formData.get('phone'),
			message: formData.get('message'),
			timestamp: new Date()
		};

		try {
			const docRef = await addDoc(collection(db, 'contacts'), data);
			statusMessage = 'Message sent successfully!';
			form.reset();
		} catch (error) {
			console.error('Error sending message:', error);
			statusMessage = 'Error sending message. Please try again.';
		} finally {
			isSubmitting = false;
			setTimeout(() => statusMessage = '', 5000);
		}
	}
</script>

<section>
	{#if statusMessage}
		<div class:success={statusMessage.includes('success')} class:error={statusMessage.includes('Error')} class="status-message">
			{statusMessage}
		</div>
	{/if}

	<form class="contact" on:submit={handleSubmit} bind:this={form}>
		<div class="contact__row">
			<label for="name">Name</label>
			<input type="text" id="name" name="name" placeholder="John Doe" />
			<label for="email">Email</label>
			<input required type="email" id="email" name="email" placeholder="johndoe@company.com" />
			<label for="phone">Phone</label>
			<input type="tel" id="phone" name="phone" placeholder="123-456-789" />
			<label for="message">Message</label>
			<textarea required id="message" name="message" placeholder="Hello, what's up?" />
		</div>

		<button class="contact__btn btn" type="submit" disabled={isSubmitting}>
			<SendDiagonal />
			<p>{isSubmitting ? 'Sending...' : 'Send Message'}</p>
		</button>
	</form>
</section>

<style>
	/* Add these new styles */
	.status-message {
		padding: var(--space-s);
		margin-bottom: var(--space-m);
		border: var(--brand-border);
	}

	.success {
		background-color: var(--success-bg);
		color: var(--success-text);
	}

	.error {
		background-color: var(--error-bg);
		color: var(--error-text);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* Existing styles remain the same */
	.contact {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.contact .contact__row:first-child {
		border-top: var(--brand-border);
	}

	.contact__row {
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 992px) {
		.contact__row {
			grid-template-columns: 200px 1fr;
		}
	}

	.contact__row label {
		padding: var(--space-s);
		border-bottom: var(--brand-border);
		border-left: var(--brand-border);
		border-right: var(--brand-border);
		font-family: var(--font-fancy);
		font-size: var(--step-1);
	}

	@media (min-width: 992px) {
		.contact__row label {
			border-right: 0;
		}
	}

	.contact__row input,
	.contact__row textarea {
		padding: var(--space-s);
		border-bottom: var(--brand-border);
		border-right: var(--brand-border);
		border-left: var(--brand-border);
		background-color: var(--background-100);
	}

	input,
	textarea {
		flex: 1;
		border: none;
		outline: none;
	}
	textarea {
		resize: vertical;
		min-height: 200px;
	}

	input:focus,
	textarea:focus {
		background-color: var(--background-200);
	}

	.contact__btn {
		text-align: left;
		justify-content: flex-start;
		background-color: var(--primary-500);
		color: var(--black);
		margin-top: var(--space-l);
	}
</style>
