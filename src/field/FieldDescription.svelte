<!-- Extra information about a field, between its label and its input. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<div bind:this={ref} data-field="description" {...rest}>{@render children?.()}</div>
