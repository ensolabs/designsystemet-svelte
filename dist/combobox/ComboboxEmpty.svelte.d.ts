import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement;
};
declare const ComboboxEmpty: import("svelte").Component<Props, {}, "ref">;
type ComboboxEmpty = ReturnType<typeof ComboboxEmpty>;
export default ComboboxEmpty;
