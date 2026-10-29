<!-- One entry in Dropdown.List: an `<li>`, usually holding a Dropdown.Button. -->
<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';

  type Props = HTMLLiAttributes & { ref?: HTMLLIElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<li bind:this={ref} {...rest}>{@render children?.()}</li>
