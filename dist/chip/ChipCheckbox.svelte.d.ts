import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'type' | 'size'> & {
    'data-wrap'?: 'nowrap' | 'wrap';
    type?: 'checkbox' | 'radio';
    group?: unknown;
    child?: Snippet<[{
        props: Record<string, unknown>;
        input: Snippet;
    }]>;
    ref?: HTMLLabelElement;
};
declare const ChipCheckbox: import("svelte").Component<Props, {}, "ref" | "checked" | "group">;
type ChipCheckbox = ReturnType<typeof ChipCheckbox>;
export default ChipCheckbox;
