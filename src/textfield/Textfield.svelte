<!--
  A Field with its Label, Description, input (or textarea with `multiline`), affixes, counter and ValidationMessage.
  `class` and `style` go on the field; every other attribute goes on the input. Bind `value`.
-->
<script lang="ts">
  import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
  import Content from '../content.svelte';
  import Field from '../field/Field.svelte';
  import FieldAffix from '../field/FieldAffix.svelte';
  import FieldAffixes from '../field/FieldAffixes.svelte';
  import FieldCounter from '../field/FieldCounter.svelte';
  import FieldDescription from '../field/FieldDescription.svelte';
  import Input from '../input/Input.svelte';
  import Label from '../label/Label.svelte';
  import Textarea from '../textarea/Textarea.svelte';
  import type { Content as ContentType, DefaultProps } from '../types';
  import ValidationMessage from '../validation-message/ValidationMessage.svelte';

  type Common = DefaultProps & {
    label?: ContentType;
    description?: ContentType;
    error?: ContentType;
    prefix?: string;
    suffix?: string;
    counter?: number | { limit: number; under?: string; over?: string };
    ref?: HTMLInputElement | HTMLTextAreaElement;
  };
  /** Input attributes; with `multiline`, they go on a textarea instead. */
  type Props = Common & Omit<HTMLInputAttributes, 'prefix' | 'size'> & { multiline?: boolean; size?: number | null } & Pick<HTMLTextareaAttributes, 'rows' | 'cols' | 'wrap'>;

  let {
    label,
    description,
    error,
    multiline,
    prefix,
    suffix,
    counter,
    'data-color': color,
    'data-size': size,
    style,
    class: className,
    value = $bindable(),
    ref = $bindable(),
    ...rest
  }: Props = $props();
</script>

<Field class={className} data-color={color} data-size={size} {style}>
  {#if label}<Label><Content content={label} /></Label>{/if}
  {#if description}<FieldDescription><Content content={description} /></FieldDescription>{/if}
  <FieldAffixes>
    {#if prefix !== undefined}<FieldAffix>{prefix}</FieldAffix>{/if}
    {#if multiline === true}
      <Textarea bind:ref={() => ref as HTMLTextAreaElement, (el) => (ref = el)} bind:value aria-invalid={Boolean(error) || undefined} {...(rest as HTMLTextareaAttributes)} />
    {:else}
      <Input bind:ref={() => ref as HTMLInputElement, (el) => (ref = el)} bind:value aria-invalid={Boolean(error) || undefined} {...rest} />
    {/if}
    {#if suffix !== undefined}<FieldAffix>{suffix}</FieldAffix>{/if}
  </FieldAffixes>
  {#if counter}<FieldCounter {...typeof counter === 'number' ? { limit: counter } : counter} />{/if}
  {#if error}<ValidationMessage><Content content={error} /></ValidationMessage>{/if}
</Field>
