<!-- Extra information about a Fieldset, under its legend: a Paragraph. `variant` is `default`, `long` or `short`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps &
    HTMLAttributes<HTMLParagraphElement> & { variant?: 'long' | 'default' | 'short'; child?: ChildSnippet; ref?: HTMLParagraphElement };

  let { class: className, variant, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-paragraph', className], 'data-variant': variant, ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <p bind:this={ref} {...attrs}>{@render children?.()}</p>
{/if}
