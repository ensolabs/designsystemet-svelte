<!-- The content of one tab: designsystemet-web's `<ds-tabpanel>`, shown while the Tabs.Tab with the same `value` is selected. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getTabsContext } from './context';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'value'> & { value: string; ref?: HTMLElement };

  let { value, id, children, ref = $bindable(), ...rest }: Props = $props();

  const context = getTabsContext();

  const attrs = $derived({ id: id ?? context.getPrefixedValue?.(value), ...rest });
</script>

<ds-tabpanel bind:this={ref} {...attrs}>{@render children?.()}</ds-tabpanel>
