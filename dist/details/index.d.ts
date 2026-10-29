import DetailsContent from './DetailsContent.svelte';
import DetailsSummary from './DetailsSummary.svelte';
declare const Details: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLDetailsAttributes, "open"> & {
    variant?: "default" | "tinted";
    open?: boolean;
    defaultOpen?: boolean;
    onToggle?: (event: Event) => void;
    ref?: HTMLDetailsElement;
}, {}, "ref" | "open"> & {
    Summary: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLElement> & {
        ref?: HTMLElement;
    }, {}, "ref">;
    Content: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
    }, {}, "ref">;
};
export { Details, DetailsContent, DetailsSummary };
