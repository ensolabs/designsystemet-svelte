import { getContext, setContext } from 'svelte';

/** What Dialog.TriggerContext shares, as React's dialog `Context`: the dialog element, for Dialog.Trigger to open. */
export type DialogContext = { current: HTMLDialogElement | null };

const key = Symbol('DialogTriggerContext');

export const setDialogContext = (context: DialogContext) => setContext(key, context);
export const getDialogContext = (): DialogContext => getContext<DialogContext | undefined>(key) ?? { current: null };
