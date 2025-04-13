import { test, expect } from '@playwright/test';

test.describe('Products Feature', () => {
    test('displays product list', async ({ page }) => {
        await page.goto('/products');
        await expect(page.locator('.products')).toBeVisible();
        await expect(page.locator('h1')).toHaveText('NFTs');
    });

    test('product detail page shows correct information', async ({ page }) => {
        await page.goto('/products/1');
        await expect(page.locator('.detail__title')).toHaveText('Watermelon 007');
        await expect(page.locator('.detail__price')).toContainText('6.9 ETH');
    });

    test('handles non-existent product gracefully', async ({ page }) => {
        const response = await page.goto('/products/999');
        expect(response?.status()).toBe(404);
    });
});