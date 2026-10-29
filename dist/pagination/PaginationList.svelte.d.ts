import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = Omit<HTMLAttributes<HTMLUListElement>, 'size'> & {
    child?: ChildSnippet;
    ref?: HTMLUListElement;
};
declare const PaginationList: import("svelte").Component<Props, {}, "ref">;
type PaginationList = ReturnType<typeof PaginationList>;
export default PaginationList;
