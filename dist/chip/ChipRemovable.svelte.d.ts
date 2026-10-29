declare const ChipRemovable: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLButtonAttributes & {
    'data-wrap'?: "nowrap" | "wrap";
    child?: import("..").ChildSnippet;
    ref?: HTMLButtonElement;
}, {}, "ref">;
type ChipRemovable = ReturnType<typeof ChipRemovable>;
export default ChipRemovable;
