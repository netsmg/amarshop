// src/routes/api/subscribe/+server.ts
import { db } from '$lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const email = formData.get('email');

		if (typeof email !== 'string' || !email.includes('@')) {
			return new Response(JSON.stringify({ error: 'Invalid email' }), {
				status: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				}
			});
		}

		await addDoc(collection(db, 'subscribers'), {
			email: email.trim(),
			createdAt: serverTimestamp()
		});

		return new Response(JSON.stringify({ message: 'Subscribed' }), {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		});
	}
};
