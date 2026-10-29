import type { HTMLAttributes } from 'svelte/elements';
type Props = Omit<HTMLAttributes<HTMLElement>, 'value'> & {
    value: string;
    ref?: HTMLElement;
};
declare const TabsPanel: import("svelte").Component<Props, {}, "ref">;
type TabsPanel = ReturnType<typeof TabsPanel>;
export default TabsPanel;
