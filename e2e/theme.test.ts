import { test, expect } from '@playwright/test';
import { ensureColorScheme } from './utils/color-scheme';

test.describe('Theme Switching', () => {
    test('renders correctly in light mode', async ({ page }) => {
        await page.goto('/');
        await ensureColorScheme(page, 'light');
        // Add specific light mode assertions based on your CSS
    });

    test('renders correctly in dark mode', async ({ page }) => {
        await page.goto('/');
        await ensureColorScheme(page, 'dark');
        // Add specific dark mode assertions based on your CSS
    });
});