<!-- The Heading of ErrorSummary, an `h2` unless you set `level`. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Heading from '../heading/Heading.svelte';

  let { ref = $bindable(), ...rest }: ComponentProps<typeof Heading> = $props();
</script>

<Heading bind:ref {...rest} />
