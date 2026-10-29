import { pagination as getPages } from '@digdir/designsystemet-web';

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
export function pagination({ currentPage: current = 1, setCurrentPage, onChange, totalPages: total = 1, showPages: show = 7 }: PaginationOptions) {
  const { next, prev, pages } = getPages({ current, total, show });
  const handleClick = (page: number) => (event: MouseEvent) => {
    if (page < 1 || page > total) return event.preventDefault();
    onChange?.(event, page);
    if (!event.defaultPrevented) setCurrentPage?.(page);
  };

  return {
    pages: pages.map(({ page, current }, index) => ({
      page: (page || 'ellipsis') as number | 'ellipsis',
      itemKey: page ? `page-${page}` : `ellipsis-${index}`,
      buttonProps: page
        ? ({ 'aria-current': current ? 'true' : undefined, onclick: handleClick(page) } satisfies PaginationButtonProps as PaginationButtonProps)
        : null,
    })),
    prevButtonProps: { 'aria-hidden': !prev, onclick: handleClick(prev) } as PaginationButtonProps,
    nextButtonProps: { 'aria-hidden': !next, onclick: handleClick(next) } as PaginationButtonProps,
    hasPrev: !!prev,
    hasNext: !!next,
  };
}
