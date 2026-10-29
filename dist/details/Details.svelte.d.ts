import type { HTMLDetailsAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLDetailsAttributes, 'open'> & {
    variant?: 'default' | 'tinted';
    open?: boolean;
    defaultOpen?: boolean;
    onToggle?: (event: Event) => void;
    ref?: HTMLDetailsElement;
};
declare const Details: import("svelte").Component<Props, {}, "ref" | "open">;
type Details = ReturnType<typeof Details>;
export default Details;
