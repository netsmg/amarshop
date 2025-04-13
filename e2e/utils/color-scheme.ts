export async function ensureColorScheme(page: any, scheme: 'light' | 'dark') {
    await page.evaluate((colorScheme: string) => {
        // Force color scheme
        document.documentElement.style.colorScheme = colorScheme;
        
        // Emulate media query
        window.matchMedia = (query: string) => ({
            matches: query.includes(colorScheme),
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        });

        // Trigger any listeners
        window.dispatchEvent(new Event('colorschemechange'));
    }, scheme);
}