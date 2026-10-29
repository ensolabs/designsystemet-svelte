<!-- Renders one story snippet, so a test can mount a snippet exported from a stories file. -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { story }: { story: Snippet } = $props();
</script>

{@render story()}
