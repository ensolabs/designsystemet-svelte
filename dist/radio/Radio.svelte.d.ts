import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content as ContentType, DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'type' | 'role' | 'size'> & {
    label?: ContentType;
    description?: ContentType;
    error?: ContentType;
    variant?: 'outline';
    position?: 'start' | 'end';
    group?: unknown;
    ref?: HTMLInputElement;
};
declare const Radio: import("svelte").Component<Props, {}, "ref" | "group">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
