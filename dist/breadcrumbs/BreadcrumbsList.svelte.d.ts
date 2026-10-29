import type { HTMLOlAttributes } from 'svelte/elements';
type Props = HTMLOlAttributes & {
    ref?: HTMLOListElement;
};
declare const BreadcrumbsList: import("svelte").Component<Props, {}, "ref">;
type BreadcrumbsList = ReturnType<typeof BreadcrumbsList>;
export default BreadcrumbsList;
