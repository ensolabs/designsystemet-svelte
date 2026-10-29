import { getContext, setContext } from 'svelte';
const key = Symbol('suggestion');
export const setSuggestionContext = (context) => setContext(key, context);
export const getSuggestionContext = () => getContext(key) ?? { handleFilter: () => undefined, render: () => undefined };
