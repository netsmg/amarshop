import { test } from '@playwright/test';

const routes = ['/', '/products', '/products/1', '/about', '/contact'];

const devices = [
	{ name: 'desktop', width: 1920, height: 1080 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'mobile', width: 375, height: 667 }
];

const colorSchemes = [
	{ name: 'light', media: '(prefers-color-scheme: light)' },
	{ name: 'dark', media: '(prefers-color-scheme: dark)' }
];

test.describe('Page Screenshots', () => {
	for (const colorScheme of colorSchemes) {
		test.describe(`${colorScheme.name} mode`, () => {
			test.use({
				colorScheme: colorScheme.name as 'light' | 'dark'
			});

			for (const device of devices) {
				test(`capturing ${device.name} screenshots`, async ({ page }) => {
					// Set viewport size for the device
					await page.setViewportSize({
						width: device.width,
						height: device.height
					});

					for (const route of routes) {
						try {
							// Navigate to the page
							await page.goto(route);

							// Wait for any animations to complete
							await page.waitForTimeout(1000);

							// Wait for network requests to finish
							await page.waitForLoadState('networkidle');

							// Create filename
							const baseFilename =
								route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');

							const filename = `${baseFilename}-${device.name}-${colorScheme.name}`;

							// Take screenshot
							await page.screenshot({
								path: `./test-results/screenshots/${filename}.png`,
								fullPage: true
							});

							console.log(
								`✓ Captured ${colorScheme.name} screenshot of ${route} on ${device.name}`
							);
						} catch (error) {
							console.error(
								`✗ Failed to capture ${route} on ${device.name} in ${colorScheme.name} mode:`,
								error
							);
							// Optionally, you might want to fail the test
							// test.fail();
						}
					}
				});
			}
		});
	}
});

// Optional: Add a test to create a contact sheet of all screenshots
test('create screenshot contact sheet', async ({ page }) => {
	// This would require additional setup with a library like sharp or jimp
	// to combine all screenshots into a single image
	console.log('Screenshot capture completed. Files saved in test-results/screenshots/');
});
