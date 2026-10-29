import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLTableSectionElement> & {
    ref?: HTMLTableSectionElement;
};
declare const TableFoot: import("svelte").Component<Props, {}, "ref">;
type TableFoot = ReturnType<typeof TableFoot>;
export default TableFoot;
