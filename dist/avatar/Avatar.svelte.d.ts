import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = Omit<DefaultProps, 'data-size'> & HTMLAttributes<HTMLSpanElement> & {
    'data-size'?: 'xs' | 'sm' | 'md' | 'lg' | (string & {});
    'data-tooltip'?: string;
    'data-initials'?: string;
    variant?: 'circle' | 'square';
    initials?: string;
    child?: ChildSnippet;
    ref?: HTMLSpanElement;
};
declare const Avatar: import("svelte").Component<Props, {}, "ref">;
type Avatar = ReturnType<typeof Avatar>;
export default Avatar;
