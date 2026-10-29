import type { HTMLOlAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLOlAttributes & {
    child?: ChildSnippet;
    ref?: HTMLOListElement;
};
declare const ListOrdered: import("svelte").Component<Props, {}, "ref">;
type ListOrdered = ReturnType<typeof ListOrdered>;
export default ListOrdered;
