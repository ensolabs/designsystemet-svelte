import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLAttributes<HTMLDivElement> & {
    child?: ChildSnippet;
    ref?: HTMLDivElement;
};
declare const DialogBlock: import("svelte").Component<Props, {}, "ref">;
type DialogBlock = ReturnType<typeof DialogBlock>;
export default DialogBlock;
