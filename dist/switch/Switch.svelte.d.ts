import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content as ContentType, DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'type' | 'size'> & {
    label?: ContentType;
    description?: ContentType;
    position?: 'start' | 'end';
    variant?: 'outline';
    ref?: HTMLInputElement;
};
declare const Switch: import("svelte").Component<Props, {}, "ref" | "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
