import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'outline';
    child?: ChildSnippet;
    ref?: HTMLSpanElement;
};
declare const Tag: import("svelte").Component<Props, {}, "ref">;
type Tag = ReturnType<typeof Tag>;
export default Tag;
