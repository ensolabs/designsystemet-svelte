import type { HTMLLiAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLLiAttributes & {
    child?: ChildSnippet;
    ref?: HTMLLIElement;
};
declare const ListItem: import("svelte").Component<Props, {}, "ref">;
type ListItem = ReturnType<typeof ListItem>;
export default ListItem;
