import type { HTMLTableAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLTableAttributes, 'border'> & {
    zebra?: boolean;
    stickyHeader?: boolean;
    border?: boolean;
    hover?: boolean;
    ref?: HTMLTableElement;
};
declare const Table: import("svelte").Component<Props, {}, "ref">;
type Table = ReturnType<typeof Table>;
export default Table;
