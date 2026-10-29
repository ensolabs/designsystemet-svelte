<!-- A native `a` with link styles. -->
<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAnchorAttributes & { child?: ChildSnippet; ref?: HTMLAnchorElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-link', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <a bind:this={ref} {...attrs}>{@render children?.()}</a>
{/if}
