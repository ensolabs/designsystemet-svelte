import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLAttributes<HTMLElement>, 'onchange' | 'value'> & {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    ref?: HTMLElement;
};
declare const Tabs: import("svelte").Component<Props, {}, "ref" | "value">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
