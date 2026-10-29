<!--
  One tab in Tabs.List: designsystemet-web's `<ds-tab>`, controlling the Tabs.Panel with the same `value`. In
  controlled Tabs, a click asks Tabs to change `value` instead of switching by itself.
-->
<script lang="ts">
  import { customElementAttributes } from '../utilities/custom-element';
  import type { HTMLAttributes } from 'svelte/elements';
  import { getTabsContext } from './context';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'value'> & { value: string; ref?: HTMLElement };

  let { value, onclick, onclickcapture, children, ref = $bindable(), ...rest }: Props = $props();

  const context = getTabsContext();

  const attrs = $derived({
    'aria-controls': rest['aria-controls'] ?? context.getPrefixedValue?.(value),
    'aria-selected': `${context.currentValue === value}` as const,
    'data-value': value,
    role: 'tab',
    onclickcapture: (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
      onclickcapture?.(event);
      if (context.isControlled && context.currentValue !== value) event.preventDefault();
    },
    onclick: (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
      if (context.currentValue !== value) context.onChange?.(value);
      onclick?.(event);
    },
    ...rest,
  });
</script>

<ds-tab bind:this={ref} {...customElementAttributes(attrs)}>{@render children?.()}</ds-tab>
