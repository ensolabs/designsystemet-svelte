import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLTableRowElement> & {
    ref?: HTMLTableRowElement;
};
declare const TableRow: import("svelte").Component<Props, {}, "ref">;
type TableRow = ReturnType<typeof TableRow>;
export default TableRow;
