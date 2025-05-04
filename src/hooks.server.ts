// src/hooks.server.ts
export async function handle({ event, resolve }) {
	const response = await resolve(event);
	response.headers.set('Access-Control-Allow-Origin', '*'); // Or set your domain instead of *
	response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	return response;
}
