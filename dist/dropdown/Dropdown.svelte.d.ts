import type { ComponentProps } from 'svelte';
import type { Placement } from '../popover/context';
import Popover from '../popover/Popover.svelte';
type Props = Omit<ComponentProps<typeof Popover>, 'variant' | 'class'> & {
    placement?: Placement;
    class?: string;
};
declare const Dropdown: import("svelte").Component<Props, {}, "ref" | "open">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
