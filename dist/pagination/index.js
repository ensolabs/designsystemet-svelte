import PaginationRoot from './Pagination.svelte';
import PaginationButton from './PaginationButton.svelte';
import PaginationItem from './PaginationItem.svelte';
import PaginationList from './PaginationList.svelte';
const Pagination = Object.assign(PaginationRoot, { List: PaginationList, Item: PaginationItem, Button: PaginationButton });
export { Pagination, PaginationButton, PaginationItem, PaginationList };
