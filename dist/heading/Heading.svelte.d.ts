import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    'data-size'?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    child?: ChildSnippet;
    ref?: HTMLHeadingElement;
};
declare const Heading: import("svelte").Component<Props, {}, "ref">;
type Heading = ReturnType<typeof Heading>;
export default Heading;
