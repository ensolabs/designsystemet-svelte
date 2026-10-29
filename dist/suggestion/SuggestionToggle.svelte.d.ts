import type { HTMLButtonAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLButtonAttributes & {
    ref?: HTMLButtonElement;
};
declare const SuggestionToggle: import("svelte").Component<Props, {}, "ref">;
type SuggestionToggle = ReturnType<typeof SuggestionToggle>;
export default SuggestionToggle;
