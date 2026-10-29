/**
 * What Suggestion gives its Input and List: React's `SuggestionContext`. `render` reads every prop of the Suggestion, so
 * an effect that calls it runs again when the Suggestion would render again in React (a new context value there).
 */
type SuggestionContext = {
    handleFilter: () => void;
    render: () => void;
};
export declare const setSuggestionContext: (context: SuggestionContext) => SuggestionContext;
export declare const getSuggestionContext: () => SuggestionContext;
export {};
