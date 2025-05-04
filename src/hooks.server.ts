// src/hooks.server.ts
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Add CORS headers to the response
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');

	return response;
}
