import type { HTMLThAttributes } from 'svelte/elements';
type Props = HTMLThAttributes & {
    sort?: HTMLThAttributes['aria-sort'];
    ref?: HTMLTableCellElement;
};
declare const TableHeaderCell: import("svelte").Component<Props, {}, "ref">;
type TableHeaderCell = ReturnType<typeof TableHeaderCell>;
export default TableHeaderCell;
