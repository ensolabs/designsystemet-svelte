import ListItem from './ListItem.svelte';
import ListOrdered from './ListOrdered.svelte';
import ListUnordered from './ListUnordered.svelte';
/** As in React, `List` is only a namespace: `List.Unordered`, `List.Ordered`, `List.Item`. */
declare const List: {
    Item: import("svelte").Component<import("svelte/elements").HTMLLiAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLLIElement;
    }, {}, "ref">;
    Ordered: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLOlAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLOListElement;
    }, {}, "ref">;
    Unordered: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLUListElement> & {
        child?: import("..").ChildSnippet;
        ref?: HTMLUListElement;
    }, {}, "ref">;
};
export { List, ListItem, ListOrdered, ListUnordered };
