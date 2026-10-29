/**
 * React's `useMediaQuery` (deprecated upstream), with runes. React returns the boolean and renders again when it
 * changes; here the boolean is the `current` getter of the result, as in Svelte's own `MediaQuery` (from
 * `svelte/reactivity`), so read `result.current` where you use it. Call it while a component initializes.
 *
 * As in React: on the server it is `defaultValue`; in the browser it starts as the query's match (or `defaultValue`
 * with `initializeWithValue: false`), and follows it once mounted. `query` can be a function, to follow a changing
 * query.
 */
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.svelte';
const IS_SERVER = typeof window === 'undefined';
export function useMediaQuery(query, { defaultValue = false, initializeWithValue = true } = {}) {
    const getQuery = () => (typeof query === 'function' ? query() : query);
    const getMatches = (query) => {
        if (IS_SERVER)
            return defaultValue;
        return window.matchMedia(query).matches;
    };
    let matches = $state(initializeWithValue ? getMatches(getQuery()) : defaultValue);
    useIsomorphicLayoutEffect(() => {
        const query = getQuery();
        const handleChange = () => (matches = getMatches(query));
        const matchMedia = window.matchMedia(query);
        handleChange();
        if (matchMedia.addListener)
            matchMedia.addListener(handleChange);
        else
            matchMedia.addEventListener('change', handleChange);
        return () => {
            if (matchMedia.removeListener)
                matchMedia.removeListener(handleChange);
            else
                matchMedia.removeEventListener('change', handleChange);
        };
    });
    return {
        get current() {
            return matches;
        },
    };
}
