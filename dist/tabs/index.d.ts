import TabsList from './TabsList.svelte';
import TabsPanel from './TabsPanel.svelte';
import TabsTab from './TabsTab.svelte';
declare const Tabs: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLAttributes<HTMLElement>, "onchange" | "value"> & {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    ref?: HTMLElement;
}, {}, "ref" | "value"> & {
    List: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLElement> & {
        ref?: HTMLElement;
    }, {}, "ref">;
    Tab: import("svelte").Component<Omit<import("svelte/elements").HTMLAttributes<HTMLElement>, "value"> & {
        value: string;
        ref?: HTMLElement;
    }, {}, "ref">;
    Panel: import("svelte").Component<Omit<import("svelte/elements").HTMLAttributes<HTMLElement>, "value"> & {
        value: string;
        ref?: HTMLElement;
    }, {}, "ref">;
};
export { Tabs, TabsList, TabsPanel, TabsTab };
