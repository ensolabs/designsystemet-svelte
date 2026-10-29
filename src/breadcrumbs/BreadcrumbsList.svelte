<!-- The trail in Breadcrumbs: an `<ol>` of Breadcrumbs.Item. -->
<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';

  type Props = HTMLOlAttributes & { ref?: HTMLOListElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<ol bind:this={ref} {...rest}>{@render children?.()}</ol>
