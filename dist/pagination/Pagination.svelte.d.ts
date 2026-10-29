import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLElement> & {
    'aria-label'?: string;
    'data-current'?: string;
    'data-total'?: string;
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const Pagination: import("svelte").Component<Props, {}, "ref">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
