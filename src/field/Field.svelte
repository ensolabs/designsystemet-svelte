<!--
  Wraps a form field: Label, Field.Description, the input, ValidationMessage. It is designsystemet-web's `<ds-field>`,
  which links them (`for`, `id`, `aria-describedby`); don't set those yourself. `position="end"` puts a checkbox,
  radio or switch after its label.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLElement> & { position?: 'start' | 'end'; child?: ChildSnippet; ref?: HTMLElement };

  let { class: className, position, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-field', className], 'data-position': position, ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <ds-field bind:this={ref} {...attrs}>{@render children?.()}</ds-field>
{/if}
