<!--
  A text input that suggests values from a list: Suggestion.Input, Suggestion.List of Suggestion.Option, and optionally
  Suggestion.Empty, Suggestion.Clear and Suggestion.Toggle, in designsystemet-web's `<ds-suggestion>`. As in React,
  `defaultSelected` starts it with items the user then changes, and `selected` controls it: a choice by the user calls
  `onSelectedChange`, and the items stay `selected` until the parent changes it. `bind:selected` is Svelte's controlled
  form: a choice updates the bound value. An item is `{ label, value }`, or an array of them with `multiple`; a string
  stands for an item whose label is its value. `filter` hides options that don't match the typed text; `creatable` lets
  the user add values; `name` adds a hidden `select` for forms.
-->
<script lang="ts">
  import { customElementAttributes } from '../utilities/custom-element';
  import type { DSSuggestionElement } from '@digdir/designsystemet-web';
  import { untrack, type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';
  import { setSuggestionContext } from './context';
  import { resetClearLabel } from './sr-clear';
  import type { EventBeforeMatch, Filter, SuggestionItem } from './types';

  type Value = string | SuggestionItem;
  type Props = DefaultProps &
    HTMLAttributes<DSSuggestionElement> & {
      /** Filter options: `true` matches the label against the typed text; a function decides itself. Default `true`. */
      filter?: boolean | Filter;
      /** Lets the user create new items. */
      creatable?: boolean;
      /** Called when the typed text is matched against the options. */
      onBeforeMatch?: (event: EventBeforeMatch) => void;
      /** The name of a hidden `select` with the selected values, for forms. */
      name?: string;
      /** Renders a selected item (in a chip with `multiple`). Default: its label. */
      renderSelected?: Snippet<[SuggestionItem]>;
      ref?: DSSuggestionElement;
    } & (
      | {
          multiple?: false;
          /** The selected item: controls the Suggestion. */
          selected?: Value | null;
          /** The item selected at first, when `selected` isn't given. */
          defaultSelected?: Value;
          onSelectedChange?: (value: SuggestionItem | null) => void;
        }
      | {
          /** Lets the user select several items. */
          multiple: true;
          /** The selected items: control the Suggestion. */
          selected?: Value[] | null;
          /** The items selected at first, when `selected` isn't given. */
          defaultSelected?: Value[];
          onSelectedChange?: (value: SuggestionItem[]) => void;
        }
    );

  let {
    children,
    class: className,
    creatable = false,
    filter = true,
    multiple = false,
    name,
    onBeforeMatch,
    onSelectedChange,
    renderSelected,
    selected = $bindable(),
    // The parent's `selected` itself: after `selected = …`, it has the new value only if the parent bound `selected`.
    selected: parentSelected,
    defaultSelected,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const selectId = $derived(rest.id ? `${rest.id}-select` : uid);

  const text = (el: Element) => el.textContent?.trim() || '';
  const sanitizeItems = (values: Value | Value[] = []): SuggestionItem[] =>
    typeof values === 'string'
      ? [{ label: values, value: values }]
      : !Array.isArray(values)
        ? [values]
        : values.map((value) => (typeof value === 'string' ? { label: value, value } : value));
  const nextItems = (data: HTMLDataElement, prev: SuggestionItem[], multiple: boolean) => {
    const item = { label: text(data), value: data.value };
    if (!multiple) return data.isConnected ? undefined : item;
    return data.isConnected ? prev.filter(({ value }) => value !== item.value) : [...prev, item];
  };
  const defaultFilter: Filter = ({ label, input }) => label.toLowerCase().includes(input.value.trim().toLowerCase());

  let defaultItems = $state(untrack(() => sanitizeItems(defaultSelected)));
  const selectedItems = $derived(selected ? sanitizeItems(selected) : defaultItems);

  // The web component asks before it adds or removes an item: cancel, and change `selected` instead.
  $effect(() => {
    const combobox = ref;
    const beforeSelect = (event: Event) => {
      event.preventDefault();
      const isControlled = selected !== undefined;
      const next = nextItems((event as CustomEvent<HTMLDataElement>).detail, selectedItems, combobox?.multiple ?? false);
      (onSelectedChange as ((value: SuggestionItem | SuggestionItem[] | null) => void) | undefined)?.(next || null);
      // With bind:selected, the parent gets the new items. Otherwise `selected` stays the parent's, as in React.
      selected = next || null;
      const bound = parentSelected === selected;
      if (!bound) selected = parentSelected;
      // Uncontrolled, the items change here, as React's default items do; bound, they follow too, for a `selected` of
      // null after a clear.
      if (!isControlled || bound) defaultItems = sanitizeItems(next);
    };
    combobox?.addEventListener('comboboxbeforeselect', beforeSelect);
    return () => combobox?.removeEventListener('comboboxbeforeselect', beforeSelect);
  });

  $effect(() => {
    const combobox = ref;
    const beforeMatch = (event: Event) => onBeforeMatch?.(event as unknown as EventBeforeMatch);
    combobox?.addEventListener('comboboxbeforematch', beforeMatch);
    return () => combobox?.removeEventListener('comboboxbeforematch', beforeMatch);
  });

  // Disables the options that don't match the input; Suggestion.Input and Suggestion.List call it.
  const handleFilter = () => {
    const { control: input, options = [] } = ref || {};
    const filterFn = filter === true ? defaultFilter : filter;
    let index = 0;
    for (const option of Array.from(options) as HTMLOptionElement[]) {
      if (!option.hasAttribute('data-empty')) {
        if (filterFn && input) {
          option.disabled = !filterFn({ index, input, label: option.label, optionElement: option, text: option.text, value: option.value });
        }
        index++;
      }
    }
  };

  // React's Suggestion gives a new context value on every render, so the list filters again: here, on a change of any
  // of its props.
  const render = () =>
    void [children, className, creatable, defaultSelected, filter, multiple, name, onBeforeMatch, onSelectedChange, renderSelected, selectedItems, ...Object.values(rest)];

  setSuggestionContext({ handleFilter, render });

  $effect(() => resetClearLabel(ref));
</script>

<!-- React renders `true` on a custom element as an empty attribute. Svelte's client only focuses on `autofocus`, without
     writing it, so the attachment writes it as React does (the server writes it from `rest`). -->
<ds-suggestion
  bind:this={ref}
  data-multiple={multiple ? '' : undefined}
  data-creatable={creatable ? '' : undefined}
  class={['ds-suggestion', className]}
  {...customElementAttributes(rest)}
  {@attach (el) => el.toggleAttribute('autofocus', Boolean(rest.autofocus))}
>
  {#each selectedItems as item (item.value)}
    <!-- `value` for the server; the attachment for "", which Svelte's client skips (the `data` already has it as a
         property), and React writes. -->
    <data value={item.value} {@attach (el) => el.setAttribute('value', item.value)}>{#if renderSelected}{@render renderSelected(item)}{:else}{item.label}{/if}</data>
  {/each}
  {@render children?.()}
  {#if name}<select {name} multiple hidden id={selectId}></select>{/if}
</ds-suggestion>
