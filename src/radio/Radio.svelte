<!--
  A radio button in a Field, with its Label, description and ValidationMessage. `class` and `style` go on the field; every
  other attribute goes on the input. Bind `group` to the value of the chosen radio button.
-->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Content from '../content.svelte';
  import Field from '../field/Field.svelte';
  import Input from '../input/Input.svelte';
  import Label from '../label/Label.svelte';
  import type { Content as ContentType, DefaultProps } from '../types';
  import ValidationMessage from '../validation-message/ValidationMessage.svelte';

  type Props = DefaultProps &
    Omit<HTMLInputAttributes, 'type' | 'role' | 'size'> & {
      label?: ContentType;
      description?: ContentType;
      error?: ContentType;
      variant?: 'outline';
      position?: 'start' | 'end';
      group?: unknown;
      ref?: HTMLInputElement;
    };

  let {
    'data-size': size,
    children,
    class: className,
    description,
    error,
    label,
    position,
    style,
    variant,
    checked,
    group = $bindable(),
    ref = $bindable(),
    ...rest
  }: Props = $props();
</script>

<Field data-size={size} data-variant={variant} data-position={position} class={className} {style}>
  <Input type="radio" bind:ref {checked} bind:group {...rest} />
  {#if label}<Label weight="regular"><Content content={label} /></Label>{/if}
  {#if description}<div data-field="description"><Content content={description} /></div>{/if}
  {#if error}<ValidationMessage><Content content={error} /></ValidationMessage>{/if}
</Field>
