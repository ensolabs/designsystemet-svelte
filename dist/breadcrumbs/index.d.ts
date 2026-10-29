import BreadcrumbsItem from './BreadcrumbsItem.svelte';
import BreadcrumbsLink from '../link/Link.svelte';
import BreadcrumbsList from './BreadcrumbsList.svelte';
declare const Breadcrumbs: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLElement> & {
    'aria-label'?: string;
    ref?: HTMLElement;
}, {}, "ref"> & {
    List: import("svelte").Component<import("svelte/elements").HTMLOlAttributes & {
        ref?: HTMLOListElement;
    }, {}, "ref">;
    Item: import("svelte").Component<import("svelte/elements").HTMLLiAttributes & {
        ref?: HTMLLIElement;
    }, {}, "ref">;
    Link: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAnchorAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLAnchorElement;
    }, {}, "ref">;
};
export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList };
