import type { HTMLButtonAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLButtonAttributes & {
    ref?: HTMLButtonElement;
};
declare const SuggestionClear: import("svelte").Component<Props, {}, "ref">;
type SuggestionClear = ReturnType<typeof SuggestionClear>;
export default SuggestionClear;
