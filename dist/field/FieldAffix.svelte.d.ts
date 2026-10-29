import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLSpanElement> & {
    ref?: HTMLSpanElement;
};
declare const FieldAffix: import("svelte").Component<Props, {}, "ref">;
type FieldAffix = ReturnType<typeof FieldAffix>;
export default FieldAffix;
