import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLAttributes<HTMLDataListElement>, 'autoPlacement'> & {
    /** @deprecated Use `data-sr-singular` on Suggestion. The screen reader text for one suggestion; `%d` is the number. */
    singular?: string;
    /** @deprecated Use `data-sr-plural` on Suggestion. The screen reader text for several suggestions; `%d` is the number. */
    plural?: string;
    /** Whether to enable auto placement. Default `true`. */
    autoPlacement?: boolean;
    ref?: HTMLDataListElement;
};
declare const SuggestionList: import("svelte").Component<Props, {}, "ref">;
type SuggestionList = ReturnType<typeof SuggestionList>;
export default SuggestionList;
