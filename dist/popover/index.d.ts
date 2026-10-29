import PopoverTrigger from './PopoverTrigger.svelte';
import PopoverTriggerContext from './PopoverTriggerContext.svelte';
declare const Popover: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLAttributes<HTMLDivElement>, "popover"> & {
    id?: string;
    placement?: import("./context").Placement;
    open?: boolean;
    variant?: "default" | "tinted";
    onOpen?: () => void;
    onClose?: () => void;
    autoPlacement?: boolean;
    child?: import("..").ChildSnippet;
    ref?: HTMLElement;
}, {}, "ref" | "open"> & {
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
    } & {
        inline?: boolean;
    }, {}, "ref">;
};
export type { Placement } from './context';
export { Popover, PopoverTrigger, PopoverTriggerContext };
