import { getContext, setContext } from 'svelte';

/** Placement of a popover, dropdown or tooltip next to its trigger, as floating-ui's `Placement`. */
export type Placement = `${'top' | 'right' | 'bottom' | 'left'}${'' | '-start' | '-end'}`;

/** What Popover.TriggerContext shares, as React's popover `Context`: the id the trigger points at. */
export type PopoverContext = { popoverId?: string };

const key = Symbol('PopoverTriggerContext');

export const setPopoverContext = (context: PopoverContext) => setContext(key, context);
export const getPopoverContext = (): PopoverContext => getContext<PopoverContext | undefined>(key) ?? {};
