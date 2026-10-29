import type { HTMLAttributes } from 'svelte/elements';
type Props = Omit<HTMLAttributes<HTMLElement>, 'value'> & {
    value: string;
    ref?: HTMLElement;
};
declare const TabsTab: import("svelte").Component<Props, {}, "ref">;
type TabsTab = ReturnType<typeof TabsTab>;
export default TabsTab;
