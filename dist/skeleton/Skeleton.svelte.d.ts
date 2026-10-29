import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLAttributes<HTMLSpanElement> & {
    width?: string | number;
    height?: string | number;
    variant?: 'rectangle' | 'circle' | 'text';
    /** Declared upstream but unused there: it ends up as an attribute, as in React. */
    characters?: number;
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const Skeleton: import("svelte").Component<Props, {}, "ref">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
