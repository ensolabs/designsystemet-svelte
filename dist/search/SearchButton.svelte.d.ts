declare const SearchButton: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLButtonAttributes, "command" | "commandfor"> & {
    variant?: "primary" | "secondary" | "tertiary";
    icon?: boolean;
    loading?: boolean | import("svelte").Snippet;
    command?: string;
    commandfor?: string;
    child?: import("..").ChildSnippet;
    ref?: HTMLButtonElement;
}, {}, "ref">;
type SearchButton = ReturnType<typeof SearchButton>;
export default SearchButton;
