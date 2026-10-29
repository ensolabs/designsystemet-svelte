import SelectOptgroup from './SelectOptgroup.svelte';
import SelectOption from './SelectOption.svelte';
declare const Select: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLSelectAttributes, "size" | "multiple"> & {
    readonly?: boolean;
    width?: "full" | "auto";
    ref?: HTMLSelectElement;
}, {}, "ref" | "value"> & {
    Option: import("svelte").Component<import("svelte/elements").HTMLOptionAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLOptionElement;
    }, {}, "ref">;
    Optgroup: import("svelte").Component<import("svelte/elements").HTMLOptgroupAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLOptGroupElement;
    }, {}, "ref">;
};
export { Select, SelectOptgroup, SelectOption };
