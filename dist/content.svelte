<!-- Renders a Content prop: text as is, a snippet by calling it. -->
<script lang="ts">
  import type { Content } from './types';

  let { content }: { content: Content | undefined } = $props();
</script>

{#if typeof content === 'string'}{content}{:else if content}{@render content()}{/if}
