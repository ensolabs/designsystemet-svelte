import type { HTMLLiAttributes } from 'svelte/elements';
type Props = HTMLLiAttributes & {
    ref?: HTMLLIElement;
};
declare const BreadcrumbsItem: import("svelte").Component<Props, {}, "ref">;
type BreadcrumbsItem = ReturnType<typeof BreadcrumbsItem>;
export default BreadcrumbsItem;
