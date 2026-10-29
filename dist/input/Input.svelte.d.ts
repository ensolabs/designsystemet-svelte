import type { HTMLInputAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'size' | 'autofocus'> & {
    size?: number | null;
    group?: unknown;
    autofocus?: boolean | string | null;
    ref?: HTMLInputElement;
};
declare const Input: import("svelte").Component<Props, {}, "ref" | "value" | "checked" | "group" | "indeterminate">;
type Input = ReturnType<typeof Input>;
export default Input;
