import type { HTMLOptionAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLOptionAttributes & {
    ref?: HTMLOptionElement;
};
declare const SuggestionOption: import("svelte").Component<Props, {}, "ref">;
type SuggestionOption = ReturnType<typeof SuggestionOption>;
export default SuggestionOption;
