<script>
	import { borderAnimation } from '$lib/actions/animation';
	import { SendDiagonal } from '$lib/icons';
</script>

<section>
	<form class="contact">
		<div class="contact__row">
			<label for="name">Username</label>
			<input type="text" id="user-name" name="user-name" placeholder="John Doe" />
			<label for="email">Email</label>
			<input required type="email" id="email" name="email" placeholder="johndoe@company.com" />
			<label for="phone">Password</label>
			<input type="password" id="password" name="password" placeholder="Enter credentials.." />
			
		</div>

		<button class="contact__btn btn">
			<SendDiagonal />
			<p>Login/Register</p>
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
