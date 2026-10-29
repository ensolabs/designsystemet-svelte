import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'tinted';
    child?: ChildSnippet;
    ref?: HTMLElement;
};
declare const Card: import("svelte").Component<Props, {}, "ref">;
type Card = ReturnType<typeof Card>;
export default Card;
