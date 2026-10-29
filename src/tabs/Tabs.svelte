<!--
  Tabs that switch between panels: Tabs.List with a Tabs.Tab per Tabs.Panel, matched by `value`. Bind `value` to
  control the selected tab, or give `defaultValue` and let designsystemet-web's `<ds-tabs>` switch them; `onChange`
  gets the new value either way.
-->
<script lang="ts">
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

  let { value = $bindable(), defaultValue, class: className, onChange, children, ref = $bindable(), ...rest }: Props = $props();

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
      if (isControlled) value = newValue;
      else uncontrolledValue = newValue;
      onChange?.(newValue);
    },
    getPrefixedValue: (value) => value && `${valuePrefix}-${value}`,
  });

  const attrs = $derived({ class: ['ds-tabs', className], ...rest });
</script>

<ds-tabs bind:this={ref} {...attrs}>{@render children?.()}</ds-tabs>
