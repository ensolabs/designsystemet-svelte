import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement;
};
declare const FieldAffixes: import("svelte").Component<Props, {}, "ref">;
type FieldAffixes = ReturnType<typeof FieldAffixes>;
export default FieldAffixes;
