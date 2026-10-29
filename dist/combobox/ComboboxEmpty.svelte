<!-- Shown in the open list of a Combobox when no option matches. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getComboboxContext, getMode } from './context';

  type Props = HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement };

  let { children, class: className, ref = $bindable(), ...rest }: Props = $props();

  const context = getComboboxContext('ComboboxEmpty');
  const mode = getMode();
</script>

{#if mode === 'list' && context.filteredOptions.length === 0}
  <div bind:this={ref} class={['ds-label', 'ds-combobox__empty', className]} data-size={context.size} {...rest}>{@render children?.()}</div>
{/if}
