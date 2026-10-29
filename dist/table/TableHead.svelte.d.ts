import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLTableSectionElement> & {
    ref?: HTMLTableSectionElement;
};
declare const TableHead: import("svelte").Component<Props, {}, "ref">;
type TableHead = ReturnType<typeof TableHead>;
export default TableHead;
