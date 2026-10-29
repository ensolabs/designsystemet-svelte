<!-- Links a Popover.Trigger to the Popover inside it, with a generated id or the Popover's own `id`. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setPopoverContext } from './context';

  let { children }: { children: Snippet } = $props();

  const autoId = $props.id();
  let popoverId = $state(autoId);

  setPopoverContext({
    get popoverId() {
      return popoverId;
    },
    set popoverId(id) {
      popoverId = id;
    },
  });
</script>

{@render children()}
