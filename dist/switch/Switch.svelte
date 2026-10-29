<!--
  A switch (a checkbox with `role="switch"`) in a Field, with its Label and description. `class` and `style` go on the
  field; every other attribute goes on the input. Bind `checked`.
-->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Content from '../content.svelte';
  import Field from '../field/Field.svelte';
  import Input from '../input/Input.svelte';
  import Label from '../label/Label.svelte';
  import type { Content as ContentType, DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLInputAttributes, 'type' | 'size'> & {
      label?: ContentType;
      description?: ContentType;
      position?: 'start' | 'end';
      variant?: 'outline';
      ref?: HTMLInputElement;
    };

  let {
    'data-size': size,
    children,
    class: className,
    description,
    label,
    position,
    style,
    variant,
    checked = $bindable(),
    ref = $bindable(),
    ...rest
  }: Props = $props();
</script>

<Field class={className} data-position={position} data-size={size} data-variant={variant} {style}>
  <Input type="checkbox" role="switch" bind:ref bind:checked {...rest} />
  {#if label}<Label weight="regular"><Content content={label} /></Label>{/if}
  {#if description}<div data-field="description"><Content content={description} /></div>{/if}
</Field>
