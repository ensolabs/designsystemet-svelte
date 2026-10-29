import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLTableSectionElement> & {
    ref?: HTMLTableSectionElement;
};
declare const TableBody: import("svelte").Component<Props, {}, "ref">;
type TableBody = ReturnType<typeof TableBody>;
export default TableBody;
