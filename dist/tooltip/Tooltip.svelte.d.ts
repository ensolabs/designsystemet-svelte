import type { HTMLAttributes } from 'svelte/elements';
import type { Placement } from '../popover/context';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLAttributes<HTMLElement>, 'content'> & {
    content: string;
    placement?: Placement;
    autoPlacement?: boolean;
    open?: boolean;
    type?: 'describedby' | 'labelledby';
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const Tooltip: import("svelte").Component<Props, {}, "ref">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
