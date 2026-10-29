import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLAttributes<HTMLParagraphElement> & {
    'data-size'?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'long' | 'default' | 'short';
    child?: ChildSnippet;
    ref?: HTMLParagraphElement;
};
declare const Paragraph: import("svelte").Component<Props, {}, "ref">;
type Paragraph = ReturnType<typeof Paragraph>;
export default Paragraph;
