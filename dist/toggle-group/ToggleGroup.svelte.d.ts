import type { HTMLFieldsetAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLFieldsetAttributes, 'onchange'> & {
    variant?: 'primary' | 'secondary';
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    'data-toggle-group'?: string;
    ref?: HTMLFieldSetElement;
};
declare const ToggleGroup: import("svelte").Component<Props, {}, "ref" | "value">;
type ToggleGroup = ReturnType<typeof ToggleGroup>;
export default ToggleGroup;
