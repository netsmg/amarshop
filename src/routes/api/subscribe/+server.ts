// src/routes/api/subscribe/+server.ts
import db from '$lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();

		if (!email || !email.includes('@')) {
			return json({ error: 'Invalid email' }, { status: 400 });
		}

		await addDoc(collection(db, 'subscribers'), { email, createdAt: new Date() });

		return json({ message: 'Email saved successfully' });
	} catch (err) {
		console.error(err);
		return json({ error: 'Something went wrong' }, { status: 500 });
	}
};
