import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../../types';
type Props = HTMLAttributes<HTMLElement> & {
    /** The value used to decide which item gets focus. */
    value?: string;
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const RovingFocusItem: import("svelte").Component<Props, {}, "ref">;
type RovingFocusItem = ReturnType<typeof RovingFocusItem>;
export default RovingFocusItem;
