<!--
  One button in a ToggleGroup: a `label` styled as a tertiary Button around a radio button. Without `value`, it gets a
  generated one. `disabled`, `readonly`, `required`, `form` and the `form*` attributes go on the radio button.
-->
<script lang="ts">
  import type { HTMLInputAttributes, HTMLLabelAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';
  import { getToggleGroup } from './context';

  type Props = DefaultProps &
    HTMLLabelAttributes &
    Pick<HTMLInputAttributes, 'formaction' | 'formenctype' | 'formtarget' | 'formmethod' | 'required' | 'formnovalidate' | 'disabled' | 'readonly'> & {
      value?: string;
      /** Accepted for React parity; React ignores it too. */
      icon?: boolean;
      ref?: HTMLLabelElement;
    };

  let {
    class: className,
    children,
    icon,
    value: rawValue,
    'aria-disabled': ariaDisabled,
    disabled,
    readonly,
    form,
    formaction,
    formenctype,
    formmethod,
    formnovalidate,
    formtarget,
    required,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const genValue = $props.id();
  const toggleGroup = getToggleGroup();
  const value = $derived(rawValue ?? genValue);
  const active = $derived(toggleGroup.value === value);
</script>

<label bind:this={ref} {...rest} class={['ds-button', className]} data-variant="tertiary" aria-disabled={ariaDisabled ?? disabled}>
  <input
    aria-disabled={ariaDisabled}
    checked={active}
    {disabled}
    {readonly}
    {form}
    {formaction}
    {formenctype}
    {formmethod}
    {formnovalidate}
    {formtarget}
    name={toggleGroup.name}
    onchange={() => toggleGroup.onChange?.(value)}
    {required}
    type="radio"
    {value}
  />{@render children?.()}
</label>
