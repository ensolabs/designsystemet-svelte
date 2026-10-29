import ErrorSummaryHeading from './ErrorSummaryHeading.svelte';
import ErrorSummaryItem from './ErrorSummaryItem.svelte';
import ErrorSummaryLink from './ErrorSummaryLink.svelte';
import ErrorSummaryList from './ErrorSummaryList.svelte';
declare const ErrorSummary: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<import("@digdir/designsystemet-web").DSErrorSummaryElement> & {
    child?: import("..").ChildSnippet;
    ref?: import("@digdir/designsystemet-web").DSErrorSummaryElement;
}, {}, "ref"> & {
    Heading: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLHeadingElement> & {
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        'data-size'?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
        child?: import("..").ChildSnippet;
        ref?: HTMLHeadingElement;
    }, {}, "ref">;
    Item: import("svelte").Component<import("svelte/elements").HTMLLiAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLLIElement;
    }, {}, "ref">;
    List: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLUListElement> & {
        child?: import("..").ChildSnippet;
        ref?: HTMLUListElement;
    }, {}, "ref">;
    Link: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAnchorAttributes & {
        child?: import("..").ChildSnippet;
        ref?: HTMLAnchorElement;
    }, {}, "ref">;
};
export { ErrorSummary, ErrorSummaryHeading, ErrorSummaryItem, ErrorSummaryLink, ErrorSummaryList };
