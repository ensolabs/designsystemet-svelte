import { getContext, setContext } from 'svelte';
const key = Symbol('ToggleGroup');
export const setToggleGroup = (context) => setContext(key, context);
export const getToggleGroup = () => getContext(key) ?? {};
