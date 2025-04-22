
import { auth } from '$lib/firebase';
import { goto } from '$app/navigation';

export function redirectIfNotLoggedIn() {
	auth.onAuthStateChanged((user) => {
		if (!user) {
			goto('/auth');
		}
	});
}
