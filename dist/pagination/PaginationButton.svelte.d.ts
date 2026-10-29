import type { ComponentProps } from 'svelte';
import Button from '../button/Button.svelte';
type Props = Omit<ComponentProps<typeof Button>, 'icon' | 'loading'>;
declare const PaginationButton: import("svelte").Component<Props, {}, "ref">;
type PaginationButton = ReturnType<typeof PaginationButton>;
export default PaginationButton;
