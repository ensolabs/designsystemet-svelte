export type PaginationOptions = {
    /** The current page, from 1. */
    currentPage: number;
    /** The number of pages. */
    totalPages: number;
    /** How many page buttons to show, ellipses included. Default 7. */
    showPages?: number;
    /** Called with the page to go to, unless `onChange` prevented the click. */
    setCurrentPage?: (page: number) => void;
    /** Called on every click on a page, previous or next button; `event.preventDefault()` stops `setCurrentPage`. */
    onChange?: (event: MouseEvent, page: number) => void;
};
/** Attributes to spread on a Pagination.Button. */
export type PaginationButtonProps = {
    'aria-current'?: 'true';
    'aria-hidden'?: boolean;
    onclick: (event: MouseEvent) => void;
};
/**
 * The pages, previous and next buttons for a Pagination, as React's `usePagination`. A pure function: wrap it in
 * `$derived` to follow the current page.
 *
 * ```svelte
 * <script lang="ts">
 *   let currentPage = $state(1);
 *   const p = $derived(pagination({ currentPage, totalPages: 10, setCurrentPage: (page) => (currentPage = page) }));
 * </script>
 *
 * <Pagination aria-label="Sidenavigering">
 *   <Pagination.List>
 *     <Pagination.Item><Pagination.Button aria-label="Forrige side" {...p.prevButtonProps}>Forrige</Pagination.Button></Pagination.Item>
 *     {#each p.pages as { page, itemKey, buttonProps } (itemKey)}
 *       <Pagination.Item>{#if buttonProps}<Pagination.Button {...buttonProps}>{page}</Pagination.Button>{/if}</Pagination.Item>
 *     {/each}
 *     <Pagination.Item><Pagination.Button aria-label="Neste side" {...p.nextButtonProps}>Neste</Pagination.Button></Pagination.Item>
 *   </Pagination.List>
 * </Pagination>
 * ```
 */
export declare function pagination({ currentPage: current, setCurrentPage, onChange, totalPages: total, showPages: show }: PaginationOptions): {
    pages: {
        page: number | "ellipsis";
        itemKey: string;
        buttonProps: PaginationButtonProps | null;
    }[];
    prevButtonProps: PaginationButtonProps;
    nextButtonProps: PaginationButtonProps;
    hasPrev: boolean;
    hasNext: boolean;
};
