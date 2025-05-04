// src/routes/api/subscribe/+server.ts
import { db } from '$lib/firebase'; // use named export for clarity
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const rawEmail = formData.get('email');

		if (typeof rawEmail !== 'string' || !rawEmail.includes('@')) {
			return json({ error: 'Invalid email address.' }, { status: 400 });
		}

		await addDoc(collection(db, 'subscribers'), {
			email: rawEmail.trim(),
			createdAt: serverTimestamp()
		});

		return json({ message: 'Subscription successful.' }, {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*', // Optional CORS support
			}
		});
	} catch (error) {
		console.error('Firebase error:', error);
		return json({ error: 'Failed to save email.' }, { status: 500 });
	}
};
