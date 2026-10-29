import PopoverRoot from './Popover.svelte';
import PopoverTrigger from './PopoverTrigger.svelte';
import PopoverTriggerContext from './PopoverTriggerContext.svelte';

const Popover = Object.assign(PopoverRoot, { TriggerContext: PopoverTriggerContext, Trigger: PopoverTrigger });

export type { Placement } from './context';
export { Popover, PopoverTrigger, PopoverTriggerContext };
