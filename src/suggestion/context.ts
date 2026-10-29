import { getContext, setContext } from 'svelte';

/** What Suggestion gives its Input and List: React's `SuggestionContext`. */
type SuggestionContext = { handleFilter: () => void };

const key = Symbol('suggestion');

export const setSuggestionContext = (context: SuggestionContext) => setContext(key, context);

export const getSuggestionContext = (): SuggestionContext => getContext<SuggestionContext | undefined>(key) ?? { handleFilter: () => undefined };
