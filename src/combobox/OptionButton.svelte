<!-- The button of an option in the open list, for Combobox.Option and the rows of a virtual list. -->
<script lang="ts">
  import { onDestroy, type Snippet } from 'svelte';
  import { getComboboxContext, prefix, type ComboboxOptionProps } from './context';
  import Icon from './Icon.svelte';
  import { CHECKMARK } from './icons';

  type Props = ComboboxOptionProps & { children?: Snippet };

  let { value, description, children, class: className, ref = $bindable(), displayValue: _, ...rest }: Props = $props();

  const context = getComboboxContext('ComboboxOption');
  const uid = $props.id();
  const labelId = `${uid}-label`;
  const id = $derived(rest.id || uid);
  const key = $derived(prefix(String(value)));
  const index = $derived(context.filteredOptions.indexOf(key));
  const selected = $derived(context.selectedOptions[key]);
  const active = $derived(context.activeIndex === index);

  // useComboboxOption: a click selects after 50 ms (debounced), as in React.
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const onOptionClick = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => context.onOptionClick(value), 50);
  };
  onDestroy(() => clearTimeout(timeout));
</script>

<!-- The attributes after `rest` are useListNavigation's item handlers, which win in React too. No whitespace between
     the parts, as in React, so the button's text is the label's. -->
<button
  bind:this={ref}
  {id}
  role="option"
  type="button"
  aria-selected={!!selected}
  aria-labelledby={labelId}
  tabindex="-1"
  onclick={(event) => {
    onOptionClick();
    rest.onclick?.(event);
  }}
  class={['ds-label', 'ds-combobox__option', active && 'ds-combobox__option--active', context.multiple && 'ds-combobox__option--multiple', className]}
  data-size="md"
  {...rest}
  onfocus={(event) => context.syncItem(event.currentTarget)}
  onmousemove={(event) => context.syncItem(event.currentTarget)}
  {@attach (node) => {
    const i = index;
    context.setListRef(i, node);
    return () => context.setListRef(i, null);
  }}
  ><span class="ds-label" data-size={context.size}
    ><div class={[context.multiple && 'ds-combobox__option__icon-wrapper', selected && 'ds-combobox__option__icon-wrapper--selected']}
      >{#if selected}<Icon d={CHECKMARK} evenodd class="ds-combobox__option__icon-wrapper__icon" aria-hidden="true" />{/if}</div
    ></span
  ><label class="ds-label ds-combobox__option__label" data-size={context.size} id={labelId}
    >{@render children?.()}{#if description}<span class="ds-combobox__option__description">{description}</span>{/if}</label
  ></button
>
