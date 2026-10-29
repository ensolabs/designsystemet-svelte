import type { ComponentProps } from 'svelte';
import Button from '../button/Button.svelte';
type Props = Omit<ComponentProps<typeof Button>, 'variant'>;
declare const DropdownButton: import("svelte").Component<Props, {}, "ref">;
type DropdownButton = ReturnType<typeof DropdownButton>;
export default DropdownButton;
