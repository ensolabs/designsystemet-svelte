import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../../types';
import { type RovingFocusOrientation } from './context';
type Props = HTMLAttributes<HTMLElement> & {
    /** The value of the item to focus when the root gets focus. */
    activeValue?: string;
    /** The arrow keys that move focus. Default `horizontal`. */
    orientation?: RovingFocusOrientation;
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const RovingFocusRoot: import("svelte").Component<Props, {}, "ref">;
type RovingFocusRoot = ReturnType<typeof RovingFocusRoot>;
export default RovingFocusRoot;
