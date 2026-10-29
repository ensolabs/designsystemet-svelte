import FieldsetDescription from './FieldsetDescription.svelte';
import FieldsetLegend from './FieldsetLegend.svelte';
declare const Fieldset: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLFieldsetAttributes & {
    ref?: HTMLFieldSetElement;
}, {}, "ref"> & {
    Legend: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLLegendElement> & {
        ref?: HTMLLegendElement;
    }, {}, "ref">;
    Description: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLParagraphElement> & {
        variant?: "long" | "default" | "short";
        child?: import("..").ChildSnippet;
        ref?: HTMLParagraphElement;
    }, {}, "ref">;
};
export { Fieldset, FieldsetDescription, FieldsetLegend };
