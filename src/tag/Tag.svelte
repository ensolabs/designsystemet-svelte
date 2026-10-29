<!-- Shows a category or status. `variant` is `default` or `outline`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'outline'; child?: ChildSnippet; ref?: HTMLSpanElement };

  let { class: className, variant, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-tag', className], 'data-variant': variant, ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <span bind:this={ref} {...attrs}>{@render children?.()}</span>
{/if}
