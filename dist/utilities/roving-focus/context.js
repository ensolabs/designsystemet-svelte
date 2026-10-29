import { getContext, setContext } from 'svelte';
const key = Symbol('RovingFocusContext');
const fallback = {
    elements: new Map(),
    getOrderedItems: () => [],
    setFocusableValue: () => { },
    onShiftTab: () => { },
    focusableValue: null,
    orientation: 'horizontal',
};
export const setRovingFocusContext = (context) => setContext(key, context);
export const getRovingFocusContext = () => getContext(key) ?? fallback;
