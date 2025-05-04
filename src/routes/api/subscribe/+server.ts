import { db } from '$lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { RequestHandler } from './$types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

export const OPTIONS: RequestHandler = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    await addDoc(collection(db, 'subscribers'), {
      email: email.trim(),
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: 'Subscribed successfully' }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
};
