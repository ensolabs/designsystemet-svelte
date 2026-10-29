import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement;
};
declare const DetailsContent: import("svelte").Component<Props, {}, "ref">;
type DetailsContent = ReturnType<typeof DetailsContent>;
export default DetailsContent;
