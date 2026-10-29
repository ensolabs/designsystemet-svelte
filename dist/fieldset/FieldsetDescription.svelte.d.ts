import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'long' | 'default' | 'short';
    child?: ChildSnippet;
    ref?: HTMLParagraphElement;
};
declare const FieldsetDescription: import("svelte").Component<Props, {}, "ref">;
type FieldsetDescription = ReturnType<typeof FieldsetDescription>;
export default FieldsetDescription;
