<!-- The `summary` of a Details: the heading that opens and closes it. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLElement> & { ref?: HTMLElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<summary bind:this={ref} {...rest}>{@render children?.()}</summary>
