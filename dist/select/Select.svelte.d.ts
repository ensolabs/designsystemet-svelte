import type { HTMLSelectAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLSelectAttributes, 'multiple' | 'size'> & {
    readonly?: boolean;
    width?: 'full' | 'auto';
    ref?: HTMLSelectElement;
};
declare const Select: import("svelte").Component<Props, {}, "ref" | "value">;
type Select = ReturnType<typeof Select>;
export default Select;
