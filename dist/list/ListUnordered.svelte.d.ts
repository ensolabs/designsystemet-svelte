import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLUListElement> & {
    child?: ChildSnippet;
    ref?: HTMLUListElement;
};
declare const ListUnordered: import("svelte").Component<Props, {}, "ref">;
type ListUnordered = ReturnType<typeof ListUnordered>;
export default ListUnordered;
