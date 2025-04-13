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
        if (!email || !password) {
            errorMessage = 'Please fill in all fields';
            return;
        }

        isLoading = true;
        errorMessage = '';
        
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                successMessage = 'Login successful! Redirecting...';
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                successMessage = 'Registration successful! Redirecting...';
            }
            setTimeout(() => goto('/dashboard'), 1500);
        } catch (error) {
            handleAuthError(error);
        } finally {
            isLoading = false;
        }
    };

    const handleAuthError = (error) => {
        const errors = {
            'auth/email-already-in-use': 'Email already in use',
            'auth/invalid-email': 'Invalid email address',
            'auth/weak-password': 'Password must be 6+ characters',
            'auth/user-not-found': 'Account not found',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many attempts. Try again later'
        };
        errorMessage = errors[error.code] || 'Authentication failed. Please try again';
    };
</script>

<section class="auth-container">
    <div class="auth-card">
        <h2 class="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        <form class="auth-form" on:submit|preventDefault={handleAuth}>
            <div class="input-group">
                <input
                    type="email"
                    bind:value={email}
                    placeholder=" "
                    required
                    class="modern-input"
                />
                <label>Email Address</label>
                <div class="underline"></div>
            </div>

            <div class="input-group">
                <input
                    type="password"
                    bind:value={password}
                    placeholder=" "
                    required
                    class="modern-input"
                />
                <label>Password</label>
                <div class="underline"></div>
            </div>

            {#if errorMessage}
                <div class="alert error">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {errorMessage}
                </div>
            {/if}

            {#if successMessage}
                <div class="alert success">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {successMessage}
                </div>
            {/if}

            <button class="auth-button" type="submit" disabled={isLoading}>
                {#if isLoading}
                    <span class="spinner"></span>
                {:else}
                    <SendDiagonal />
                {/if}
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            </button>
        </form>

        <div class="auth-footer">
            <button on:click={() => isLogin = !isLogin} class="toggle-auth">
                {isLogin 
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
            </button>
        </div>
    </div>
</section>

<style>
    .auth-container {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 2rem;
        
    }

    .auth-card {
        width: 100%;
        max-width: 420px;
        padding: 2.5rem;
        background: var(--background-100);
        border-radius: 1.25rem;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                    0 8px 10px -6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s var(--transition);
    }

    .auth-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-100);
        margin-bottom: 2rem;
        text-align: center;
    }

    .auth-form {
        display: grid;
        gap: 1.75rem;
    }

    .input-group {
        position: relative;
    }

    .modern-input {
        width: 100%;
        padding: 1rem 0.5rem 0.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 0;
        background-color: transparent;
        border-bottom: 1px solid var(--text-200);
        transition: all 0.3s var(--transition);
    }

    .modern-input:focus {
        outline: none;
        border-color: var(--primary-500);
    }

    .modern-input:focus + label,
    .modern-input:not(:placeholder-shown) + label {
        transform: translateY(-1.25rem) scale(0.85);
        color: var(--primary-500);
    }

    .input-group label {
        position: absolute;
        top: 1rem;
        left: 0.5rem;
        color: var(--text-200);
        pointer-events: none;
        transition: all 0.3s var(--transition);
        transform-origin: left center;
    }

    .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--primary-500);
        transition: width 0.3s var(--transition);
    }

    .modern-input:focus ~ .underline {
        width: 100%;
    }

    .auth-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        width: 100%;
        padding: 1rem;
        margin-top: 1rem;
        background: var(--primary-500);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s var(--transition);
    }

    .auth-button:hover:not(:disabled) {
        background: var(--primary-600);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .auth-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinner {
        width: 1.25rem;
        height: 1.25rem;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }

    .alert {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
    }

    .error {
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--error-500);
        border-left: 3px solid var(--error-500);
    }

    .success {
        background-color: rgba(16, 185, 129, 0.1);
        color: var(--success-500);
        border-left: 3px solid var(--success-500);
    }

    .auth-footer {
        margin-top: 1.5rem;
        text-align: center;
    }

    .toggle-auth {
        background: none;
        border: none;
        color: var(--text-200);
        font-size: 0.875rem;
        cursor: pointer;
        transition: color 0.2s var(--transition);
    }

    .toggle-auth:hover {
        color: var(--primary-500);
    }

    .toggle-auth strong {
        color: var(--primary-500);
        font-weight: 600;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 480px) {
        .auth-card {
            padding: 1.5rem;
            border-radius: 0.75rem;
        }
        
        .auth-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }
    }
</style>
