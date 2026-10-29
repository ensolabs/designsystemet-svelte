<!--
  A group of buttons, one of which is chosen: a `fieldset` of radio buttons in ToggleGroup.Item labels.
  designsystemet-web moves focus with the arrow keys (`focusgroup`). Name it with `aria-label`, `aria-labelledby` or
  `data-toggle-group`. Bind `value`, or set `defaultValue`; `onChange` gets the chosen value. `variant` is `primary` or
  `secondary`.
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
    variant,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const nameId = $props.id();
  // Uncontrolled, as in React: start from `defaultValue` and keep the choice here.
  if (value === undefined) value = untrack(() => defaultValue);

  setToggleGroup({
    get defaultValue() {
      return defaultValue;
    },
    get name() {
      return name ?? `togglegroup-name-${nameId}`;
    },
    get value() {
      return value;
    },
    get variant() {
      return variant;
    },
    onChange: (newValue) => {
      value = newValue;
      onChange?.(newValue);
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
