<!-- Renders a snippet on its own, so its text can be read (text.browser.ts, text.server.ts). -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { snippet }: { snippet: Snippet } = $props();
</script>

{@render snippet()}
