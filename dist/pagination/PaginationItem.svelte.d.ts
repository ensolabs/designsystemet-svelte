import type { HTMLLiAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = Omit<HTMLLiAttributes, 'size'> & {
    child?: ChildSnippet;
    ref?: HTMLLIElement;
};
declare const PaginationItem: import("svelte").Component<Props, {}, "ref">;
type PaginationItem = ReturnType<typeof PaginationItem>;
export default PaginationItem;
