export type UseMediaQueryOptions = {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
};
export declare function useMediaQuery(query: string | (() => string), { defaultValue, initializeWithValue }?: UseMediaQueryOptions): {
    readonly current: boolean;
};
