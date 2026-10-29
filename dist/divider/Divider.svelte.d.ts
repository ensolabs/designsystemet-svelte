import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLHRElement> & {
    ref?: HTMLHRElement;
};
declare const Divider: import("svelte").Component<Props, {}, "ref">;
type Divider = ReturnType<typeof Divider>;
export default Divider;
