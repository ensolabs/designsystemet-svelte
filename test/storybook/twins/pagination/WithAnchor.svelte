<!-- The WithAnchor story: usePagination on the story's args, with links as page buttons. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Pagination, usePagination, type UsePaginationProps } from '../../../../src';

  let { args: initial }: { args: UsePaginationProps } = $props();

  // The story's args in state, with updateArgs({ currentPage }) as setCurrentPage.
  const args: UsePaginationProps = $state({
    ...untrack(() => initial),
    setCurrentPage: (currentPage: number) => (args.currentPage = currentPage),
  });
  const pagination = usePagination(args);
  const { pages, nextButtonProps, prevButtonProps } = $derived(pagination);
</script>

<Pagination aria-label="Sidenavigering">
  <Pagination.List>
    <Pagination.Item>
      <Pagination.Button aria-label="Forrige side" {...prevButtonProps}>
        {#snippet child({ props })}<a href="#forrige-side" {...props}>Forrige</a>{/snippet}
      </Pagination.Button>
    </Pagination.Item>
    {#each pages as { page, itemKey, buttonProps } (itemKey)}
      <Pagination.Item>
        {#if typeof page === 'number'}
          <Pagination.Button aria-label={`Side ${page}`} {...buttonProps}>
            {#snippet child({ props })}<a href={`#side-${page}`} {...props}>{page}</a>{/snippet}
          </Pagination.Button>
        {/if}
      </Pagination.Item>
    {/each}
    <Pagination.Item>
      <Pagination.Button aria-label="Neste side" {...nextButtonProps}>
        {#snippet child({ props })}<a href="#neste-side" {...props}>Neste</a>{/snippet}
      </Pagination.Button>
    </Pagination.Item>
  </Pagination.List>
</Pagination>
