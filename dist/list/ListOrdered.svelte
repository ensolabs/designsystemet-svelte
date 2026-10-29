<!-- An `ol` with list styles, of List.Item. -->
<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLOlAttributes & { child?: ChildSnippet; ref?: HTMLOListElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-list', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <ol bind:this={ref} {...attrs}>{@render children?.()}</ol>
{/if}
