<!--
  A text input that suggests values from a list: Suggestion.Input, Suggestion.List of Suggestion.Option, and optionally
  Suggestion.Empty, Suggestion.Clear and Suggestion.Toggle, in designsystemet-web's `<ds-suggestion>`. Bind `selected`
  (an item, or an array with `multiple`; a string stands for an item whose label is its value), or listen with
  `onSelectedChange`. `filter` hides options that don't match the typed text; `creatable` lets the user add values;
  `name` adds a hidden `select` for forms.
-->
<script lang="ts">
  import type { DSSuggestionElement } from '@digdir/designsystemet-web';
  import type { Snippet } from 'svelte';
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
          /** The selected item. */
          selected?: Value | null;
          onSelectedChange?: (value: SuggestionItem | null) => void;
        }
      | {
          /** Lets the user select several items. */
          multiple: true;
          /** The selected items. */
          selected?: Value[] | null;
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

  const selectedItems = $derived(selected ? sanitizeItems(selected) : []);

  // The web component asks before it adds or removes an item: cancel, and change `selected` instead.
  $effect(() => {
    const combobox = ref;
    const beforeSelect = (event: Event) => {
      event.preventDefault();
      const next = nextItems((event as CustomEvent<HTMLDataElement>).detail, selectedItems, combobox?.multiple ?? false);
      (onSelectedChange as ((value: SuggestionItem | SuggestionItem[] | null) => void) | undefined)?.(next || null);
      selected = next || null;
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

  setSuggestionContext({ handleFilter });

  $effect(() => resetClearLabel(ref));
</script>

<!-- React renders `true` on a custom element as an empty attribute. -->
<ds-suggestion bind:this={ref} data-multiple={multiple ? '' : undefined} data-creatable={creatable ? '' : undefined} class={['ds-suggestion', className]} {...rest}>
  {#each selectedItems as item (item.value)}
    <!-- As an attribute: Svelte's `value` skips "", which the `data` already has as a property, and React writes. -->
    <data {@attach (el) => el.setAttribute('value', item.value)}>{#if renderSelected}{@render renderSelected(item)}{:else}{item.label}{/if}</data>
  {/each}
  {@render children?.()}
  {#if name}<select {name} multiple hidden id={selectId}></select>{/if}
</ds-suggestion>
