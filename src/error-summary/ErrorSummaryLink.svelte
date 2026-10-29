<!-- A neutral Link to the field with the error, in an ErrorSummary.Item. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Link from '../link/Link.svelte';

  let { ref = $bindable(), ...rest }: ComponentProps<typeof Link> = $props();
</script>

<Link bind:ref data-color="neutral" {...rest} />
