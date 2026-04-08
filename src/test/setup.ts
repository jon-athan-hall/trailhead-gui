import '@testing-library/jest-dom/vitest';

// Mantine reads window.matchMedia for color-scheme detection; jsdom doesn't
// implement it, so polyfill a no-op version for tests.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  });
}