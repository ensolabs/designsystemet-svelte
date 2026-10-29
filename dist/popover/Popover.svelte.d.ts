import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
import { type Placement } from './context';
type Props = DefaultProps & Omit<HTMLAttributes<HTMLDivElement>, 'popover'> & {
    id?: string;
    placement?: Placement;
    open?: boolean;
    variant?: 'default' | 'tinted';
    onOpen?: () => void;
    onClose?: () => void;
    /** Accepted, as in React, and not rendered. */
    autoPlacement?: boolean;
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const Popover: import("svelte").Component<Props, {}, "ref" | "open">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
