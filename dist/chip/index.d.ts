import ChipButton from './ChipButton.svelte';
import ChipCheckbox from './ChipCheckbox.svelte';
import ChipRadio from './ChipRadio.svelte';
import ChipRemovable from './ChipRemovable.svelte';
declare const Chip: {
    Button: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLButtonAttributes & {
        'data-wrap'?: "nowrap" | "wrap";
        child?: import("..").ChildSnippet;
        ref?: HTMLButtonElement;
    }, {}, "ref">;
    Checkbox: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLInputAttributes, "type" | "size"> & {
        'data-wrap'?: "nowrap" | "wrap";
        type?: "checkbox" | "radio";
        group?: unknown;
        child?: import("svelte").Snippet<[{
            props: Record<string, unknown>;
            input: import("svelte").Snippet;
        }]>;
        ref?: HTMLLabelElement;
    }, {}, "ref" | "checked" | "group">;
    Radio: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLInputAttributes, "type" | "size"> & {
        'data-wrap'?: "nowrap" | "wrap";
        type?: "checkbox" | "radio";
        group?: unknown;
        child?: import("svelte").Snippet<[{
            props: Record<string, unknown>;
            input: import("svelte").Snippet;
        }]>;
        ref?: HTMLLabelElement;
    }, {}, "ref" | "checked" | "group">;
    Removable: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLButtonAttributes & {
        'data-wrap'?: "nowrap" | "wrap";
        child?: import("..").ChildSnippet;
        ref?: HTMLButtonElement;
    }, {}, "ref">;
};
export { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable };
