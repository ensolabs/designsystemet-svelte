<!--
  Navigation between pages: Pagination.List of Pagination.Item with Pagination.Button. Give `data-current` and
  `data-total` and designsystemet-web's `<ds-pagination>` numbers the buttons itself, or build them with
  `pagination()`. Give it an `aria-label`.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps &
    HTMLAttributes<HTMLElement> & {
      'aria-label'?: string;
      'data-current'?: string;
      'data-total'?: string;
      child?: ChildSnippet;
      ref?: HTMLElement;
    };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-pagination', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <ds-pagination bind:this={ref} {...attrs}>{@render children?.()}</ds-pagination>
{/if}
