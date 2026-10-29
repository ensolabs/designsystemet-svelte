<!-- The usePagination Preview story: pagination() following the current page. -->
<script lang="ts">
  import { Pagination, pagination, type PaginationOptions } from '../../../../src';

  let { currentPage = $bindable(), ...options }: PaginationOptions = $props();

  const p = $derived(pagination({ ...options, currentPage, setCurrentPage: (page) => (currentPage = page) }));
</script>

<Pagination aria-label="Sidenavigering">
  <Pagination.List>
    <Pagination.Item>
      <Pagination.Button aria-label="Forrige side" {...p.prevButtonProps}>Forrige</Pagination.Button>
    </Pagination.Item>
    {#each p.pages as { page, itemKey, buttonProps } (itemKey)}
      <Pagination.Item>
        {#if typeof page === 'number'}
          <Pagination.Button aria-label={`Side ${page}`} {...buttonProps}>{page}</Pagination.Button>
        {/if}
      </Pagination.Item>
    {/each}
    <Pagination.Item>
      <Pagination.Button aria-label="Neste side" {...p.nextButtonProps}>Neste</Pagination.Button>
    </Pagination.Item>
  </Pagination.List>
</Pagination>
