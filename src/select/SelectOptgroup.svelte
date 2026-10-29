<!-- A native `optgroup` of Select.Option in a Select. -->
<script lang="ts">
  import type { HTMLOptgroupAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = HTMLOptgroupAttributes & { child?: ChildSnippet; ref?: HTMLOptGroupElement };

  let { child, children, ref = $bindable(), ...rest }: Props = $props();
</script>

{#if child}
  {@render child({ props: rest })}
{:else}
  <optgroup bind:this={ref} {...rest}>{@render children?.()}</optgroup>
{/if}
