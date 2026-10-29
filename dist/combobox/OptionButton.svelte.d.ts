import { type Snippet } from 'svelte';
import { type ComboboxOptionProps } from './context';
type Props = ComboboxOptionProps & {
    children?: Snippet;
};
declare const OptionButton: import("svelte").Component<Props, {}, "ref">;
type OptionButton = ReturnType<typeof OptionButton>;
export default OptionButton;
