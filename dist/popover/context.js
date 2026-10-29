import { getContext, setContext } from 'svelte';
const key = Symbol('PopoverTriggerContext');
export const setPopoverContext = (context) => setContext(key, context);
export const getPopoverContext = () => getContext(key) ?? {};
