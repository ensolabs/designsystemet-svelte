import DialogBlock from './DialogBlock.svelte';
import DialogTrigger from './DialogTrigger.svelte';
import DialogTriggerContext from './DialogTriggerContext.svelte';
declare const Dialog: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLDialogAttributes, "open" | "closedby"> & {
    closeButton?: string | false;
    closedby?: "none" | "closerequest" | "any";
    placement?: "center" | "left" | "right" | "top" | "bottom";
    modal?: boolean;
    open?: boolean;
    onClose?: (event: Event) => void;
    ref?: HTMLDialogElement;
}, {}, "ref" | "open"> & {
    Block: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
        child?: import("..").ChildSnippet;
        ref?: HTMLDivElement;
    }, {}, "ref">;
    TriggerContext: import("svelte").Component<{
        children: import("svelte").Snippet;
    }, {}, "">;
    Trigger: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLButtonAttributes, "command" | "commandfor"> & {
        variant?: "primary" | "secondary" | "tertiary";
        icon?: boolean;
        loading?: boolean | import("svelte").Snippet;
        command?: string;
        commandfor?: string;
        child?: import("..").ChildSnippet;
        ref?: HTMLButtonElement;
    }, {}, "ref">;
};
export { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext };
