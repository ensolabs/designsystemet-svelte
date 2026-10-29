import BreadcrumbsRoot from './Breadcrumbs.svelte';
import BreadcrumbsItem from './BreadcrumbsItem.svelte';
// Breadcrumbs.Link is Link, as in React.
import BreadcrumbsLink from '../link/Link.svelte';
import BreadcrumbsList from './BreadcrumbsList.svelte';
const Breadcrumbs = Object.assign(BreadcrumbsRoot, { List: BreadcrumbsList, Item: BreadcrumbsItem, Link: BreadcrumbsLink });
export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList };
