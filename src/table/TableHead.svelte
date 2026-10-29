<!-- A native `thead`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLTableSectionElement> & { ref?: HTMLTableSectionElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<thead bind:this={ref} {...rest}>{@render children?.()}</thead>
