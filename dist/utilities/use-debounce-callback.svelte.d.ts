/**
 * React's `useDebounceCallback` (deprecated upstream): returns a function that calls `callback` with its latest
 * arguments once it hasn't been called for `delay` milliseconds (default 50). A call still waiting when the component
 * is destroyed is dropped. Call it while a component initializes, as a React hook during render.
 */
type DebounceFunction<T> = (...args: T[]) => void;
export declare function useDebounceCallback<T>(callback: DebounceFunction<T>, delay?: number): (...args: T[]) => void;
export {};
