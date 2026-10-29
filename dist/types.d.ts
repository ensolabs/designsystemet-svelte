import type { Snippet } from 'svelte';
/** The sizes of the default theme; a theme can add its own. */
export type Size = 'sm' | 'md' | 'lg';
/** The props every component takes, as in `@digdir/designsystemet-react`. */
export type DefaultProps = {
    /** Changes the size for descendant Designsystemet components and variables. */
    'data-size'?: Size | (string & {});
    /** Changes the color for descendant Designsystemet components and variables: a theme color or a severity. */
    'data-color'?: string;
};
/**
 * Stands in for React's `asChild`: instead of its own element, the component calls `child` with the attributes it
 * would have set, and the snippet spreads them on an element of its own.
 *
 * ```svelte
 * <Button>{#snippet child({ props })}<a href="/" {...props}>Til forsiden</a>{/snippet}</Button>
 * ```
 */
export type ChildSnippet = Snippet<[{
    props: Record<string, unknown>;
}]>;
/** Text or a snippet, where React takes a `ReactNode` that isn't the children. */
export type Content = string | Snippet;
