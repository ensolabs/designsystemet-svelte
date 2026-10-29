import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLUListElement> & {
    ref?: HTMLUListElement;
};
declare const DropdownList: import("svelte").Component<Props, {}, "ref">;
type DropdownList = ReturnType<typeof DropdownList>;
export default DropdownList;
