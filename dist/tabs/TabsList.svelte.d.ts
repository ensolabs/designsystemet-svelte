import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLElement> & {
    ref?: HTMLElement;
};
declare const TabsList: import("svelte").Component<Props, {}, "ref">;
type TabsList = ReturnType<typeof TabsList>;
export default TabsList;
