declare const ErrorSummaryHeading: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    'data-size'?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    child?: import("..").ChildSnippet;
    ref?: HTMLHeadingElement;
}, {}, "ref">;
type ErrorSummaryHeading = ReturnType<typeof ErrorSummaryHeading>;
export default ErrorSummaryHeading;
