import TableRoot from './Table.svelte';
import TableBody from './TableBody.svelte';
import TableCell from './TableCell.svelte';
import TableFoot from './TableFoot.svelte';
import TableHead from './TableHead.svelte';
import TableHeaderCell from './TableHeaderCell.svelte';
import TableRow from './TableRow.svelte';

const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
  Foot: TableFoot,
});

export { Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow };
