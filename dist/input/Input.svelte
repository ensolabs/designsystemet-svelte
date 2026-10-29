<!--
  A native `input`. A read-only input ignores changes and clicks (so read-only checkboxes and radios can't be toggled).
  Bind `value`, `checked` (checkbox), `indeterminate` (checkbox) or `group` (checkbox or radio) as on a plain input.
  `indeterminate` is the DOM property only, never an attribute, so the markup stays React's (React sets it by ref).
  `autofocus` is Svelte's boolean attribute; a string is written as it is, as React writes a lower-case `autofocus`
  (`autofocus="true"`, which Digdir's DialogWithForm story uses so a Dialog focuses the input when it opens).
-->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { DefaultProps } from '../types';

  const attachment = createAttachmentKey();

  type Props = DefaultProps &
    Omit<HTMLInputAttributes, 'size' | 'autofocus'> & { size?: number | null; group?: unknown; autofocus?: boolean | string | null; ref?: HTMLInputElement };

  let {
    type = 'text',
    class: className,
    value = $bindable(),
    checked = $bindable(),
    group = $bindable(),
    indeterminate = $bindable(),
    onchange,
    onclick,
    autofocus,
    ref = $bindable(),
    ...props
  }: Props = $props();

  // Svelte's client sets the `autofocus` property, which writes `autofocus=""` whatever the value: a string is set as
  // the attribute instead, by an attachment, and left out of the spread (the server writes it from there).
  const rest = $derived(
    typeof autofocus === 'string' && typeof window !== 'undefined'
      ? { ...props, [attachment]: (el: HTMLInputElement) => el.setAttribute('autofocus', autofocus) }
      : { ...props, autofocus: autofocus as boolean | null | undefined },
  );

  const handleChange: HTMLInputAttributes['onchange'] = (event) => {
    if (!rest.readonly) onchange?.(event);
  };
  // Svelte's own bind:group only sees the inputs of one component, so each Input updates the group itself. A radio's
  // group can start undefined (nothing chosen), so a radio always writes it.
  const changeGroup: HTMLInputAttributes['onchange'] = (event) => {
    const { checked: on } = event.currentTarget;
    if (type === 'radio') group = value;
    else group = on ? [...(group as unknown[]), value] : (group as unknown[]).filter((item) => item !== value);
    handleChange(event);
  };
  const handleClick: HTMLInputAttributes['onclick'] = (event) => {
    if (rest.readonly) event.preventDefault();
    onclick?.(event);
  };
</script>

{#if type === 'checkbox' && group !== undefined}
  <input bind:this={ref} class={['ds-input', className]} type="checkbox" {value} checked={(group as unknown[]).includes(value)} bind:indeterminate onchange={changeGroup} onclick={handleClick} {...rest} />
{:else if type === 'checkbox'}
  <input bind:this={ref} class={['ds-input', className]} type="checkbox" {value} bind:checked bind:indeterminate onchange={handleChange} onclick={handleClick} {...rest} />
{:else if type === 'radio'}
  <input bind:this={ref} class={['ds-input', className]} type="radio" {value} checked={group === undefined ? checked : group === value} onchange={changeGroup} onclick={handleClick} {...rest} />
{:else}
  <input bind:this={ref} class={['ds-input', className]} {type} bind:value onchange={handleChange} onclick={handleClick} {...rest} />
{/if}
