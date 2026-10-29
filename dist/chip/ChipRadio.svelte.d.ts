declare const ChipRadio: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLInputAttributes, "type" | "size"> & {
    'data-wrap'?: "nowrap" | "wrap";
    type?: "checkbox" | "radio";
    group?: unknown;
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
        input: import("svelte").Snippet;
    }]>;
    ref?: HTMLLabelElement;
}, {}, "ref" | "checked" | "group">;
type ChipRadio = ReturnType<typeof ChipRadio>;
export default ChipRadio;
