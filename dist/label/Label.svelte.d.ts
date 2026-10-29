import type { HTMLLabelAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLLabelAttributes & {
    weight?: 'regular' | 'medium' | 'semibold';
    child?: ChildSnippet;
    ref?: HTMLLabelElement;
};
declare const Label: import("svelte").Component<Props, {}, "ref">;
type Label = ReturnType<typeof Label>;
export default Label;
