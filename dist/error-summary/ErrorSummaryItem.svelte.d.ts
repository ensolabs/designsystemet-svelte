declare const ErrorSummaryItem: import("svelte").Component<import("svelte/elements").HTMLLiAttributes & {
    child?: import("..").ChildSnippet;
    ref?: HTMLLIElement;
}, {}, "ref">;
type ErrorSummaryItem = ReturnType<typeof ErrorSummaryItem>;
export default ErrorSummaryItem;
