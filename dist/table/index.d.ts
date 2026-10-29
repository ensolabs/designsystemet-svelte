import TableBody from './TableBody.svelte';
import TableCell from './TableCell.svelte';
import TableFoot from './TableFoot.svelte';
import TableHead from './TableHead.svelte';
import TableHeaderCell from './TableHeaderCell.svelte';
import TableRow from './TableRow.svelte';
declare const Table: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLTableAttributes, "border"> & {
    zebra?: boolean;
    stickyHeader?: boolean;
    border?: boolean;
    hover?: boolean;
    ref?: HTMLTableElement;
}, {}, "ref"> & {
    Head: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLTableSectionElement> & {
        ref?: HTMLTableSectionElement;
    }, {}, "ref">;
    Body: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLTableSectionElement> & {
        ref?: HTMLTableSectionElement;
    }, {}, "ref">;
    Row: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLTableRowElement> & {
        ref?: HTMLTableRowElement;
    }, {}, "ref">;
    Cell: import("svelte").Component<import("svelte/elements").HTMLTdAttributes & {
        ref?: HTMLTableCellElement;
    }, {}, "ref">;
    HeaderCell: import("svelte").Component<import("svelte/elements").HTMLThAttributes & {
        sort?: import("svelte/elements").HTMLThAttributes["aria-sort"];
        ref?: HTMLTableCellElement;
    }, {}, "ref">;
    Foot: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLTableSectionElement> & {
        ref?: HTMLTableSectionElement;
    }, {}, "ref">;
};
export { Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow };
