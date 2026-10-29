<!-- A native `option` in a Select. -->
<script lang="ts">
  import type { HTMLOptionAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = HTMLOptionAttributes & { child?: ChildSnippet; ref?: HTMLOptionElement };

  let { child, children, ref = $bindable(), ...rest }: Props = $props();
</script>

{#if child}
  {@render child({ props: rest })}
{:else}
  <option bind:this={ref} {...rest}>{@render children?.()}</option>
{/if}
