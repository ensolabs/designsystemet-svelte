import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLElement> & {
    position?: 'start' | 'end';
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const Field: import("svelte").Component<Props, {}, "ref">;
type Field = ReturnType<typeof Field>;
export default Field;
