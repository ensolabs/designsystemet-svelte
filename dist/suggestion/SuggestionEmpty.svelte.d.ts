import type { HTMLOptionAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLOptionAttributes & {
    'data-empty'?: string | boolean;
    ref?: HTMLOptionElement;
};
declare const SuggestionEmpty: import("svelte").Component<Props, {}, "ref">;
type SuggestionEmpty = ReturnType<typeof SuggestionEmpty>;
export default SuggestionEmpty;
