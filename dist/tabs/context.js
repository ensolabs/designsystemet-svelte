import { getContext, setContext } from 'svelte';
const key = Symbol('Tabs');
export const setTabsContext = (context) => setContext(key, context);
export const getTabsContext = () => getContext(key) ?? {};
