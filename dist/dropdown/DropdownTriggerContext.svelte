<!-- Links a Dropdown.Trigger to the Dropdown inside it: a Popover.TriggerContext. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import PopoverTriggerContext from '../popover/PopoverTriggerContext.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<PopoverTriggerContext>{@render children()}</PopoverTriggerContext>
