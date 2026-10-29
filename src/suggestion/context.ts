import { getContext, setContext } from 'svelte';

/**
 * What Suggestion gives its Input and List: React's `SuggestionContext`. `render` reads every prop of the Suggestion, so
 * an effect that calls it runs again when the Suggestion would render again in React (a new context value there).
 */
type SuggestionContext = { handleFilter: () => void; render: () => void };

const key = Symbol('suggestion');

export const setSuggestionContext = (context: SuggestionContext) => setContext(key, context);

export const getSuggestionContext = (): SuggestionContext => getContext<SuggestionContext | undefined>(key) ?? { handleFilter: () => undefined, render: () => undefined };
