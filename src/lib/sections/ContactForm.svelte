<script>
	import { borderAnimation } from '$lib/actions/animation';
	import { SendDiagonal } from '$lib/icons';
</script>

<section>
	<form class="contact">
		<div class="contact__row">
			<label for="name">Name</label>
			<input type="text" id="name" name="name" placeholder="John Doe" />
			<label for="email">Email</label>
			<input required type="email" id="email" name="email" placeholder="johndoe@company.com" />
			<label for="phone">Phone</label>
			<input type="tel" id="phone" name="phone" placeholder="123-456-789" />
			<label for="message">Message</label>
			<textarea required id="message" name="message" placeholder="Hello, what's up?"></textarea>
		</div>

		<button class="contact__btn btn">
			<SendDiagonal />
			<p>Send Message</p>
		</button>
	</form>
</section>

<style>
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
