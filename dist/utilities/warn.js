/** Designsystemet's console warning, as React's `warn`: in the browser only, unless `window.dsWarnings` is `false`. */
export const warn = (message, ...args) => typeof window === 'undefined' || window.dsWarnings === false || console.warn(`Designsystemet: ${message}`, ...args);
