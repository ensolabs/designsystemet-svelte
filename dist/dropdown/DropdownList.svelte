<!-- A group of entries in a Dropdown: a `<ul>` of Dropdown.Item. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLUListElement> & { ref?: HTMLUListElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<ul bind:this={ref} {...rest}>{@render children?.()}</ul>
