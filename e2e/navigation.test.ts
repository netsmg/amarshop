import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('can navigate through main routes', async ({ page }) => {
        // Home page
        await page.goto('/');
        await expect(page).toHaveTitle(/NVault/);

        // Products page
        await page.click('text=Products');
        await expect(page).toHaveURL('/products');

        // Product detail
        await page.click('a[href="/products/1"]');
        await expect(page).toHaveURL('/products/1');
    });
});