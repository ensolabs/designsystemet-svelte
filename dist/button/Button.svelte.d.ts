import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLButtonAttributes, 'command' | 'commandfor'> & {
    variant?: 'primary' | 'secondary' | 'tertiary';
    icon?: boolean;
    loading?: boolean | Snippet;
    command?: string;
    commandfor?: string;
    child?: ChildSnippet;
    ref?: HTMLButtonElement;
};
declare const Button: import("svelte").Component<Props, {}, "ref">;
type Button = ReturnType<typeof Button>;
export default Button;
