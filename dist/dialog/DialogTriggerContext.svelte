<!-- Links a Dialog.Trigger to the Dialog inside it. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setDialogContext } from './context';

  let { children }: { children: Snippet } = $props();

  setDialogContext({ current: null });
</script>

{@render children()}
