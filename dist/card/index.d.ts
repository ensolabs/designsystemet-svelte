import CardBlock from './CardBlock.svelte';
declare const Card: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "tinted";
    child?: import("..").ChildSnippet;
    ref?: HTMLElement;
}, {}, "ref"> & {
    Block: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
        child?: import("..").ChildSnippet;
        ref?: HTMLDivElement;
    }, {}, "ref">;
};
export { Card, CardBlock };
