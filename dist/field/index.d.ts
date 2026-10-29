import FieldAffix from './FieldAffix.svelte';
import FieldAffixes from './FieldAffixes.svelte';
import FieldCounter from './FieldCounter.svelte';
import FieldDescription from './FieldDescription.svelte';
declare const Field: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLElement> & {
    position?: "start" | "end";
    child?: import("..").ChildSnippet;
    ref?: HTMLElement;
}, {}, "ref"> & {
    Description: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
    }, {}, "ref">;
    Affixes: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
    }, {}, "ref">;
    Affix: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLSpanElement> & {
        ref?: HTMLSpanElement;
    }, {}, "ref">;
    Counter: import("svelte").Component<Omit<import("..").DefaultProps & Omit<import("svelte/elements").HTMLAttributes<HTMLParagraphElement>, "children"> & {
        children?: import("..").Content;
        child?: import("..").ChildSnippet;
        ref?: HTMLParagraphElement;
    }, "child"> & {
        limit: number;
        under?: string;
        over?: string;
    }, {}, "">;
};
export { Field, FieldAffix, FieldAffixes, FieldCounter, FieldDescription };
