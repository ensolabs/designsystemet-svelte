import type { HTMLLiAttributes } from 'svelte/elements';
type Props = HTMLLiAttributes & {
    ref?: HTMLLIElement;
};
declare const DropdownItem: import("svelte").Component<Props, {}, "ref">;
type DropdownItem = ReturnType<typeof DropdownItem>;
export default DropdownItem;
