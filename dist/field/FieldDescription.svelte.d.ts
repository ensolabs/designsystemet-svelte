import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement;
};
declare const FieldDescription: import("svelte").Component<Props, {}, "ref">;
type FieldDescription = ReturnType<typeof FieldDescription>;
export default FieldDescription;
