declare const DropdownTrigger: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLButtonAttributes, "command" | "commandfor"> & {
    variant?: "primary" | "secondary" | "tertiary";
    icon?: boolean;
    loading?: boolean | import("svelte").Snippet;
    command?: string;
    commandfor?: string;
    child?: import("..").ChildSnippet;
    ref?: HTMLButtonElement;
} & {
    inline?: boolean;
}, {}, "ref">;
type DropdownTrigger = ReturnType<typeof DropdownTrigger>;
export default DropdownTrigger;
