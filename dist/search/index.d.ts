import SearchButton from './SearchButton.svelte';
import SearchClear from './SearchClear.svelte';
import SearchInput from './SearchInput.svelte';
declare const Search: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<import("@digdir/designsystemet-web").DSSuggestionElement> & {
    ref?: import("@digdir/designsystemet-web").DSSuggestionElement;
}, {}, "ref"> & {
    Clear: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLButtonAttributes & {
        ref?: HTMLButtonElement;
    }, {}, "ref">;
    Button: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLButtonAttributes, "command" | "commandfor"> & {
        variant?: "primary" | "secondary" | "tertiary";
        icon?: boolean;
        loading?: boolean | import("svelte").Snippet;
        command?: string;
        commandfor?: string;
        child?: import("..").ChildSnippet;
        ref?: HTMLButtonElement;
    }, {}, "ref">;
    Input: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLInputAttributes, "type" | "size" | "readonly"> & {
        type?: "text" | "search";
        size?: number | null;
        ref?: HTMLInputElement;
    }, {}, "ref" | "value">;
};
export { Search, SearchButton, SearchClear, SearchInput };
