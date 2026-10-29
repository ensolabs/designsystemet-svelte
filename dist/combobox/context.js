import { getContext, setContext } from 'svelte';
const KEY = Symbol('combobox');
const MODE = Symbol('combobox-mode');
export const setComboboxContext = (context) => setContext(KEY, context);
export function getComboboxContext(name) {
    const context = getContext(KEY);
    if (!context)
        throw new Error(`${name} must be used within a Combobox`);
    return context;
}
export const setMode = (mode) => setContext(MODE, mode);
export const getMode = () => getContext(MODE);
const INTERNAL_OPTION_PREFIX = 'internal-option-';
/** Prefixes option values, so values that look like numbers keep their order as object keys. */
export const prefix = (value) => INTERNAL_OPTION_PREFIX + value;
export const removePrefix = (value) => value.slice(16);
