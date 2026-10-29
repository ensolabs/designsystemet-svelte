<!-- One step in Breadcrumbs.List: an `<li>`. As in React, `class` is dropped. -->
<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';

  type Props = HTMLLiAttributes & { ref?: HTMLLIElement };

  let { class: _class, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<li bind:this={ref} {...rest}>{@render children?.()}</li>
