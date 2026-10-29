import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & {
    child?: ChildSnippet;
    ref?: HTMLDivElement;
};
declare const CardBlock: import("svelte").Component<Props, {}, "ref">;
type CardBlock = ReturnType<typeof CardBlock>;
export default CardBlock;
