<!-- The List.Unordered of ErrorSummary, of ErrorSummary.Item. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ListUnordered from '../list/ListUnordered.svelte';

  let { ref = $bindable(), ...rest }: ComponentProps<typeof ListUnordered> = $props();
</script>

<ListUnordered bind:ref {...rest} />
