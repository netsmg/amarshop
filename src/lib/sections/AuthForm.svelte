
<script>
	import { borderAnimation } from '$lib/actions/animation';
	import { SendDiagonal } from '$lib/icons';
	import { auth } from '$lib/firebase';
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMessage = '';
	let successMessage = '';
	let isLoading = false;
	let isLogin = true;

	const handleAuth = async () => {
		errorMessage = '';
		successMessage = '';

		if (!email || !password) {
			errorMessage = 'Please fill in all fields';
			return;
		}

		const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!emailRegex.test(email)) {
			errorMessage = 'Please enter a valid email address';
			return;
		}

		isLoading = true;

		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, password);
				successMessage = 'Login successful! Redirecting...';
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
				successMessage = 'Registration successful! Redirecting...';
			}
			setTimeout(() => goto('/dashboard'), 1500); // Redirect after success
		} catch (error) {
			handleAuthError(error);
			password = '';
		} finally {
			isLoading = false;
		}
	};

	const handleAuthError = (error) => {
		const errorMessages = {
			'auth/email-already-in-use': 'Email already in use',
			'auth/invalid-email': 'Invalid email address',
			'auth/weak-password': 'Password must be at least 6 characters',
			'auth/user-not-found': 'No account found with this email',
			'auth/wrong-password': 'Incorrect password',
			'auth/too-many-requests': 'Too many attempts. Please try again later',
			'auth/network-request-failed': 'Network error. Please check your connection',
			'auth/operation-not-allowed': 'Authentication method not enabled',
			'auth/user-disabled': 'This account has been disabled'
		};
		errorMessage = errorMessages[error.code] || 'Authentication failed. Please try again';
	};
</script>



<section class="auth-container">
    <div class="auth-card">
        <h1 class="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
            <div class="accent-bar" />
        </h1>
        
        <form class="auth-form" on:submit|preventDefault={handleAuth}>
            <div class="input-group">
                <input
                    type="email"
                    bind:value={email}
                    placeholder=" "
                    aria-label="Email address"
                    class:error={errorMessage && errorMessage.toLowerCase().includes('email')}
                    class="modern-input"
                />
                <label>Email Address</label>
                <div class="underline" />
            </div>

            <div class="input-group">
                <input
                    type="password"
                    bind:value={password}
                    placeholder=" "
                    aria-label="Password"
                    class:error={errorMessage && errorMessage.toLowerCase().includes('password')}
                    class="modern-input"
                />
                <label>Password</label>
                <div class="underline" />
            </div>

            {#if errorMessage}
                <div class="alert error" role="alert" aria-live="assertive">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            {/if}

            {#if successMessage}
                <div class="alert success" role="status" aria-live="polite">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>{successMessage}</span>
                </div>
            {/if}

            <button class="auth-button" type="submit" disabled={isLoading}>
                {#if isLoading}
                    <span class="spinner" aria-label="Processing" />
                {:else}
                    <SendDiagonal aria-hidden="true" />
                {/if}
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            </button>
        </form>

        <div class="auth-footer">
            <button on:click={() => isLogin = !isLogin} class="toggle-auth">
                {isLogin 
                    ? "Don't have an account? <strong>Sign Up</strong>"
                    : "Already have an account? <strong>Sign In</strong>"}
            </button>
        </div>
    </div>
</section>

<style>
    :global(body) {
        background: var(--background-200);
    }

    .auth-container {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1rem;
    }

    .auth-card {
        width: 100%;
        max-width: 440px;
        padding: 2.5rem;
        background: var(--background-100);
        border-radius: 1.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                    0 8px 10px -6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s var(--transition);
    }

    .auth-title {
        position: relative;
        font-size: 1.875rem;
        font-weight: 700;
        color: var(--text-100);
        margin-bottom: 2.5rem;
        text-align: center;
    }

    .accent-bar {
        width: 60px;
        height: 4px;
        background: var(--primary-500);
        margin: 1rem auto 0;
        border-radius: 2px;
    }

    .input-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .modern-input {
        width: 100%;
        padding: 1.25rem 0.75rem 0.5rem;
        font-size: 1rem;
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--primary-100);
        transition: all 0.3s var(--transition);
    }

    .modern-input.error {
        border-color: var(--error-500);
    }

    .modern-input:focus {
        outline: none;
        border-color: var(--primary-500);
        box-shadow: 0 2px 0 0 var(--primary-100);
    }

    .input-group label {
        position: absolute;
        top: 1rem;
        left: 0.75rem;
        color: var(--text-300);
        transform-origin: left center;
        transition: all 0.3s var(--transition);
    }

    .modern-input:focus + label,
    .modern-input:not(:placeholder-shown) + label {
        transform: translateY(-1.25rem) scale(0.85);
        color: var(--primary-500);
    }

    .underline {
        height: 2px;
        background: var(--primary-500);
        transform: scaleX(0);
        transition: transform 0.3s var(--transition);
    }

    .modern-input:focus ~ .underline {
        transform: scaleX(1);
    }

    .auth-button {
        /* Keep existing styles, add these enhancements */
        margin-top: 1.5rem;
        padding: 1.1rem;
        gap: 1rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .auth-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px -2px rgba(var(--primary-500-rgb), 0.25);
    }

    .toggle-auth {
        color: var(--text-300);
        padding: 0.75rem;
        margin-top: 1.5rem;
    }

    .toggle-auth strong {
        color: var(--primary-500);
        font-weight: 600;
        margin-left: 0.5rem;
    }

    @media (max-width: 640px) {
        .auth-card {
            padding: 2rem 1.5rem;
            border-radius: 1rem;
        }

        .auth-title {
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }

        .modern-input {
            padding: 1rem 0.5rem 0.5rem;
        }
    }

    @media (max-width: 480px) {
        .auth-container {
            padding: 1rem;
        }

        .auth-button {
            padding: 1rem;
        }
    }
</style>
