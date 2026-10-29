import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAnchorAttributes & {
    child?: ChildSnippet;
    ref?: HTMLAnchorElement;
};
declare const Link: import("svelte").Component<Props, {}, "ref">;
type Link = ReturnType<typeof Link>;
export default Link;
