import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content as ContentType, DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'type' | 'role' | 'size'> & {
    label?: ContentType;
    description?: ContentType;
    error?: ContentType;
    variant?: 'outline';
    position?: 'start' | 'end';
    group?: unknown[];
    ref?: HTMLInputElement;
};
declare const Checkbox: import("svelte").Component<Props, {}, "ref" | "checked" | "group">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
