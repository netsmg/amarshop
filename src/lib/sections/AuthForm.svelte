<script>
    import { borderAnimation } from '$lib/actions/animation';
    import { SendDiagonal } from '$lib/icons';
    import { auth } from '$lib/firebase';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

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
        successMessage = '';

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                successMessage = 'Login successful! Redirecting...';
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                successMessage = 'Registration successful! Redirecting...';
            }

            setTimeout(() => goto('/dashboard'), 2000);
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email already in use';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'User not found';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                default:
                    errorMessage = 'Something went wrong. Please try again';
            }
        } finally {
            isLoading = false;
        }
    };

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) goto('/dashboard');
        });
        return () => unsubscribe();
    });
</script>

<section>
    <form class="contact" on:submit|preventDefault={handleAuth}>
        <div class="contact__row">
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                bind:value={email}
                placeholder="johndoe@company.com"
                required
            />

            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                bind:value={password}
                placeholder="Enter password..."
                required
            />
        </div>

        {#if errorMessage}
            <div class="error-message">
                {errorMessage}
            </div>
        {/if}

        {#if successMessage}
            <div class="success-message">
                {successMessage}
            </div>
        {/if}

        <button class="contact__btn btn" type="submit" disabled={isLoading}>
            {#if isLoading}
                <span class="loading-spinner" />
            {:else}
                <SendDiagonal />
            {/if}
            <p>{isLogin ? 'Login' : 'Register'}</p>
        </button>

        <div class="toggle-auth">
            <button type="button" on:click={() => isLogin = !isLogin}>
                {isLogin 
                    ? 'Need an account? Register here'
                    : 'Already have an account? Login here'}
            </button>
        </div>
    </form>
</section>

<style>
 .contact{
        max-width: 800px;
        margin: 0 auto;
        padding: var(--space-l);
    }
    .error-message {
        color: var(--error-500);
        padding: var(--space-s);
        border: var(--brand-border);
        border-color: var(--error-500);
        margin-top: var(--space-m);
    }

    .success-message {
        color: var(--success-500);
        padding: var(--space-s);
        border: var(--brand-border);
        border-color: var(--success-500);
        margin-top: var(--space-m);
    }

    .loading-spinner {
        width: 24px;
        height: 24px;
        border: 3px solid var(--background-300);
        border-top: 3px solid var(--primary-500);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .toggle-auth {
        margin-top: var(--space-m);
        text-align: center;
        
        button {
            background: none;
            border: none;
            color: var(--primary-500);
            text-decoration: underline;
            cursor: pointer;
            font-family: var(--font-normal);
            
            &:hover {
                color: var(--primary-400);
            }
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
