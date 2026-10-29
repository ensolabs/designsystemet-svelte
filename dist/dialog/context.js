import { getContext, setContext } from 'svelte';
const key = Symbol('DialogTriggerContext');
export const setDialogContext = (context) => setContext(key, context);
export const getDialogContext = () => getContext(key) ?? { current: null };
