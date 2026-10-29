import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAnchorAttributes & {
    ref?: HTMLAnchorElement;
};
declare const SkipLink: import("svelte").Component<Props, {}, "ref">;
type SkipLink = ReturnType<typeof SkipLink>;
export default SkipLink;
