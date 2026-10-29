import type { ComponentProps } from 'svelte';
import Button from '../button/Button.svelte';
/** Button props; with `inline`, only the attributes of a `<button>` apply. */
type Props = ComponentProps<typeof Button> & {
    inline?: boolean;
};
declare const PopoverTrigger: import("svelte").Component<Props, {}, "ref">;
type PopoverTrigger = ReturnType<typeof PopoverTrigger>;
export default PopoverTrigger;
