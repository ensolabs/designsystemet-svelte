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
import { pagination, type PaginationOptions } from './pagination';

/** The options of `usePagination`, as React's `UsePaginationProps`. */
export type UsePaginationProps = PaginationOptions;

export function usePagination(props: UsePaginationProps) {
  const result = $derived(pagination(props));
  return {
    /** The page buttons and ellipses, in order. */
    get pages() {
      return result.pages;
    },
    /** Attributes to spread on the previous page's Pagination.Button. */
    get prevButtonProps() {
      return result.prevButtonProps;
    },
    /** Attributes to spread on the next page's Pagination.Button. */
    get nextButtonProps() {
      return result.nextButtonProps;
    },
    /** Whether there is a previous page. */
    get hasPrev() {
      return result.hasPrev;
    },
    /** Whether there is a next page. */
    get hasNext() {
      return result.hasNext;
    },
  };
}
