declare global {
  interface Window {
    /** Set to `false` to silence Designsystemet's warnings, as in React. */
    dsWarnings?: boolean;
  }
}

/** Designsystemet's console warning, as React's `warn`: in the browser only, unless `window.dsWarnings` is `false`. */
export const warn = (message: string, ...args: unknown[]) =>
  typeof window === 'undefined' || window.dsWarnings === false || console.warn(`Designsystemet: ${message}`, ...args);
