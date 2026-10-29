import type { HTMLTdAttributes } from 'svelte/elements';
type Props = HTMLTdAttributes & {
    ref?: HTMLTableCellElement;
};
declare const TableCell: import("svelte").Component<Props, {}, "ref">;
type TableCell = ReturnType<typeof TableCell>;
export default TableCell;
