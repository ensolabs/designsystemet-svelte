<!-- A native `label`. `weight` is `regular`, `medium` or `semibold`. -->
<script lang="ts">
  import type { HTMLLabelAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps &
    HTMLLabelAttributes & { weight?: 'regular' | 'medium' | 'semibold'; child?: ChildSnippet; ref?: HTMLLabelElement };

  let { class: className, weight, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-label', className], 'data-weight': weight, ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <label bind:this={ref} {...attrs}>{@render children?.()}</label>
{/if}
