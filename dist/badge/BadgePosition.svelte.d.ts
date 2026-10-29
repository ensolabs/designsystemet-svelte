import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLSpanElement> & {
    placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    overlap?: 'circle' | 'rectangle';
    ref?: HTMLSpanElement;
};
declare const BadgePosition: import("svelte").Component<Props, {}, "ref">;
type BadgePosition = ReturnType<typeof BadgePosition>;
export default BadgePosition;
