import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    count?: number;
    maxCount?: number;
    variant?: 'base' | 'tinted';
    ref?: HTMLSpanElement;
};
declare const Badge: import("svelte").Component<Props, {}, "ref">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
