/**
 * React's `usePagination`, with runes: `pagination()` (the same calculation, as a pure function) kept up to date in a
 * `$derived`. Call it while a component initializes, with the options as a `$state` object or getters so it follows
 * the current page, and read the result's properties where you use them (they are getters: don't destructure them).
 *
 * ```svelte
 * <script lang="ts">
 *   let currentPage = $state(1);
 *   const p = usePagination({
 *     get currentPage() { return currentPage; },
 *     totalPages: 10,
 *     setCurrentPage: (page) => (currentPage = page),
 *   });
 * </script>
 *
 * <Pagination aria-label="Sidenavigering">
 *   <Pagination.List>
 *     <Pagination.Item><Pagination.Button aria-label="Forrige side" {...p.prevButtonProps}>Forrige</Pagination.Button></Pagination.Item>
 *     {#each p.pages as { page, itemKey, buttonProps } (itemKey)}
 *       <Pagination.Item>{#if buttonProps}<Pagination.Button aria-label="Side {page}" {...buttonProps}>{page}</Pagination.Button>{/if}</Pagination.Item>
 *     {/each}
 *     <Pagination.Item><Pagination.Button aria-label="Neste side" {...p.nextButtonProps}>Neste</Pagination.Button></Pagination.Item>
 *   </Pagination.List>
 * </Pagination>
 * ```
 */
import { type PaginationOptions } from './pagination';
/** The options of `usePagination`, as React's `UsePaginationProps`. */
export type UsePaginationProps = PaginationOptions;
export declare function usePagination(props: UsePaginationProps): {
    /** The page buttons and ellipses, in order. */
    readonly pages: {
        page: number | "ellipsis";
        itemKey: string;
        buttonProps: import("./pagination").PaginationButtonProps | null;
    }[];
    /** Attributes to spread on the previous page's Pagination.Button. */
    readonly prevButtonProps: import("./pagination").PaginationButtonProps;
    /** Attributes to spread on the next page's Pagination.Button. */
    readonly nextButtonProps: import("./pagination").PaginationButtonProps;
    /** Whether there is a previous page. */
    readonly hasPrev: boolean;
    /** Whether there is a next page. */
    readonly hasNext: boolean;
};
