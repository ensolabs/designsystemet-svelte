<!-- The WithAnchor story: pagination() with links as page buttons, following the current page. -->
<script lang="ts">
  import { Pagination, pagination, type PaginationOptions } from '../../../../src';

  let { currentPage = $bindable(), ...options }: PaginationOptions = $props();

  const p = $derived(pagination({ ...options, currentPage, setCurrentPage: (page) => (currentPage = page) }));
</script>

<Pagination aria-label="Sidenavigering">
  <Pagination.List>
    <Pagination.Item>
      <Pagination.Button aria-label="Forrige side" {...p.prevButtonProps}>
        {#snippet child({ props })}<a href="#forrige-side" {...props}>Forrige</a>{/snippet}
      </Pagination.Button>
    </Pagination.Item>
    {#each p.pages as { page, itemKey, buttonProps } (itemKey)}
      <Pagination.Item>
        {#if typeof page === 'number'}
          <Pagination.Button aria-label={`Side ${page}`} {...buttonProps}>
            {#snippet child({ props })}<a href={`#side-${page}`} {...props}>{page}</a>{/snippet}
          </Pagination.Button>
        {/if}
      </Pagination.Item>
    {/each}
    <Pagination.Item>
      <Pagination.Button aria-label="Neste side" {...p.nextButtonProps}>
        {#snippet child({ props })}<a href="#neste-side" {...props}>Neste</a>{/snippet}
      </Pagination.Button>
    </Pagination.Item>
  </Pagination.List>
</Pagination>
