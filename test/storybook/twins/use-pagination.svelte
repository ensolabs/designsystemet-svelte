<!-- Svelte twins of packages/react/src/utilities/hooks/use-pagination/use-pagination.stories.tsx. -->
<script module lang="ts">
  import PaginationPreview from './use-pagination/Preview.svelte';

  export { Preview };
</script>

{#snippet Preview()}<PaginationPreview currentPage={2} totalPages={10} showPages={7} />{/snippet}
