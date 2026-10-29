import ListItem from './ListItem.svelte';
import ListOrdered from './ListOrdered.svelte';
import ListUnordered from './ListUnordered.svelte';
/** As in React, `List` is only a namespace: `List.Unordered`, `List.Ordered`, `List.Item`. */
const List = { Item: ListItem, Ordered: ListOrdered, Unordered: ListUnordered };
export { List, ListItem, ListOrdered, ListUnordered };
