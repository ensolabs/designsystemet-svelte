<!--
  A group of buttons, one of which is chosen: a `fieldset` of radio buttons in ToggleGroup.Item labels.
  designsystemet-web moves focus with the arrow keys (`focusgroup`). Name it with `aria-label`, `aria-labelledby` or
  `data-toggle-group`. `variant` is `primary` or `secondary`. As in React:
  - Without `value`, the user chooses; `defaultValue` picks the first. A choice calls `onChange` with its value.
  - With `value`, it is controlled: a choice calls `onChange` and the group stays at `value` unless the parent changes
    it.
  - With `bind:value`, Svelte's controlled form, a choice calls `onChange` and then updates the bound `value`.
-->
<script lang="ts">
  import { untrack } from 'svelte';
  import type { HTMLFieldsetAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';
  import { setToggleGroup } from './context';

  type Props = DefaultProps &
    Omit<HTMLFieldsetAttributes, 'onchange'> & {
      variant?: 'primary' | 'secondary';
      value?: string;
      defaultValue?: string;
      onChange?: (value: string) => void;
      name?: string;
      'data-toggle-group'?: string;
      ref?: HTMLFieldSetElement;
    };

  let {
    'data-toggle-group': label,
    children,
    class: className,
    defaultValue,
    name,
    onChange,
    value = $bindable(),
    // The parent's `value` itself: after `value = …`, it has the new value only if the parent bound `value`.
    value: parentValue,
    variant,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const nameId = $props.id();
  const groupName = $derived(name ?? `togglegroup-name-${nameId}`);
  // Uncontrolled, as in React: start from `defaultValue` and keep the choice here.
  let uncontrolledValue = $state(untrack(() => defaultValue));
  const isControlled = $derived(value !== undefined);

  setToggleGroup({
    get defaultValue() {
      return defaultValue;
    },
    get name() {
      return groupName;
    },
    get value() {
      return isControlled ? value : uncontrolledValue;
    },
    get variant() {
      return variant;
    },
    onChange: (newValue) => {
      if (!isControlled) uncontrolledValue = newValue;
      onChange?.(newValue);
      // Updates a bound `value` (also one that starts out undefined).
      value = newValue;
      if (parentValue === newValue) return;
      // Not bound (or the parent kept its value): stay on `value`, as React does. The browser has checked the radio
      // button chosen; check the one of `value` again, as React does for a controlled radio button.
      value = parentValue;
      if (!isControlled) return;
      for (const input of ref?.querySelectorAll<HTMLInputElement>('input[type="radio"]') ?? []) {
        if (input.name === groupName) input.checked = input.value === value;
      }
    },
  });

  // `focusgroup` isn't in Svelte's element types yet; designsystemet-web polyfills it.
  const attrs = $derived({
    'aria-label': label,
    class: ['ds-toggle-group', className],
    'data-variant': variant,
    focusgroup: 'radiogroup',
    ...rest,
  });
</script>

<fieldset bind:this={ref} {...attrs}>
  {@render children?.()}
</fieldset>
