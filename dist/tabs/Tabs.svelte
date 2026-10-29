<!--
  Tabs that switch between panels: Tabs.List with a Tabs.Tab per Tabs.Panel, matched by `value`. As in React:
  - Without `value`, designsystemet-web's `<ds-tabs>` switches them; `defaultValue` picks the first.
  - With `value`, it is controlled: a click calls `onChange` and the selected tab stays `value` unless the parent
    changes it.
  - With `bind:value`, Svelte's controlled form, a click calls `onChange` and then updates the bound `value`.
-->
<script lang="ts">
  import { customElementAttributes } from '../utilities/custom-element';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';
  import { setTabsContext } from './context';

  type Props = DefaultProps &
    Omit<HTMLAttributes<HTMLElement>, 'onchange' | 'value'> & {
      value?: string;
      defaultValue?: string;
      onChange?: (value: string) => void;
      ref?: HTMLElement;
    };

  let {
    value = $bindable(),
    // The parent's `value` itself: after `value = …`, it has the new value only if the parent bound `value`.
    value: parentValue,
    defaultValue,
    class: className,
    onChange,
    children,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const valuePrefix = $props.id();
  // svelte-ignore state_referenced_locally
  let uncontrolledValue = $state(defaultValue);
  const isControlled = $derived(value !== undefined);

  setTabsContext({
    get isControlled() {
      return isControlled;
    },
    get currentValue() {
      return isControlled ? value : uncontrolledValue;
    },
    onChange: (newValue) => {
      if (!isControlled) {
        uncontrolledValue = newValue;
        onChange?.(newValue);
        return;
      }
      onChange?.(newValue);
      value = newValue;
      // Not bound (or the parent kept its value): stay on `value`, as React does.
      if (parentValue !== newValue) value = parentValue;
    },
    getPrefixedValue: (value) => value && `${valuePrefix}-${value}`,
  });

  const attrs = $derived({ class: ['ds-tabs', className], ...rest });
</script>

<ds-tabs bind:this={ref} {...customElementAttributes(attrs)}>{@render children?.()}</ds-tabs>
