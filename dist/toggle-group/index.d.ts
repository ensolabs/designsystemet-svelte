import ToggleGroupItem from './ToggleGroupItem.svelte';
declare const ToggleGroup: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLFieldsetAttributes, "onchange"> & {
    variant?: "primary" | "secondary";
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    'data-toggle-group'?: string;
    ref?: HTMLFieldSetElement;
}, {}, "ref" | "value"> & {
    Item: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLLabelAttributes & Pick<import("svelte/elements").HTMLInputAttributes, "disabled" | "formaction" | "formenctype" | "formmethod" | "formnovalidate" | "formtarget" | "readonly" | "required"> & {
        value?: string;
        icon?: boolean;
        ref?: HTMLLabelElement;
    }, {}, "ref">;
};
export { ToggleGroup, ToggleGroupItem };
