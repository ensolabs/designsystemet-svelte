<!-- A List.Item of ErrorSummary.List, around an ErrorSummary.Link. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ListItem from '../list/ListItem.svelte';

  let { ref = $bindable(), ...rest }: ComponentProps<typeof ListItem> = $props();
</script>

<ListItem bind:ref {...rest} />
