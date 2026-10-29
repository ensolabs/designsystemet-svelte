<!-- A chip that is a button. `data-wrap` is `nowrap` or `wrap`. -->
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLButtonAttributes & { 'data-wrap'?: 'nowrap' | 'wrap'; child?: ChildSnippet; ref?: HTMLButtonElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();
</script>

{#if child}
  {@render child({ props: { class: ['ds-chip', className], ...rest } })}
{:else}
  <button bind:this={ref} class={['ds-chip', className]} type="button" {...rest}>{@render children?.()}</button>
{/if}
