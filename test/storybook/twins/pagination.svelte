<!-- Svelte twins of packages/react/src/components/pagination/pagination.stories.tsx. -->
<script module lang="ts">
  import { Pagination } from '../../../src';
  import PaginationWithAnchor from './pagination/WithAnchor.svelte';

  export { Preview, WithAnchor, Mobile };
</script>

{#snippet Preview()}
  <Pagination>
    <Pagination.List>
      <Pagination.Item><Pagination.Button aria-label="Forrige side">Forrige</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Side 1">1</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Side 2" aria-current="true">2</Pagination.Button></Pagination.Item>
      <Pagination.Item />
      <Pagination.Item><Pagination.Button aria-label="Side 9">9</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Side 10">10</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Neste side">Neste</Pagination.Button></Pagination.Item>
    </Pagination.List>
  </Pagination>
{/snippet}

{#snippet WithAnchor()}
  <!-- onChange: open the console to see this event, as in the React story. -->
  <PaginationWithAnchor args={{ currentPage: 2, onChange: console.log, totalPages: 10, showPages: 7 }} />
{/snippet}

{#snippet Mobile()}
  <Pagination>
    <Pagination.List>
      <Pagination.Item><Pagination.Button aria-label="Forrige side" /></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Side 2">2</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Side 3" aria-current="true">3</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Side 4">4</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Neste side" /></Pagination.Item>
    </Pagination.List>
  </Pagination>
{/snippet}
