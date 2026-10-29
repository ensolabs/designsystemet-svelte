<!-- Renders Combobox's children in one of its two passes (see Mode in context.ts). -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setMode, type Mode } from './context';

  let { mode, children }: { mode: Mode; children?: Snippet } = $props();

  // svelte-ignore state_referenced_locally
  setMode(mode);
</script>

{@render children?.()}
