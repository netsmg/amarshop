import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e',
	use: {
		// Base configuration
		baseURL: 'http://localhost:4173',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	// Add specific projects for different color schemes
	projects: [
		{
			name: 'chromium-light',
			use: {
				colorScheme: 'light',
			},
		},
		{
			name: 'chromium-dark',
			use: {
				colorScheme: 'dark',
			},
		},
	],
});

