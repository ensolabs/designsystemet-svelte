<!--
  Deprecated upstream; use EXPERIMENTAL_Suggestion. A text input with a list of Combobox.Option to choose from, and
  Combobox.Empty for when none match. `filter` decides which options match the typed text; `name` adds a hidden
  `select` for forms; `virtual` renders only the visible options of a long list. As in React:
  - Without `value`, the user selects; `initialValue` gives the values selected at first. A change calls
    `onValueChange` with the selected values.
  - With `value`, the selection (and without `multiple`, the text) is set from `value` when `value` or the options
    change. A selection by the user calls `onValueChange` and shows, but `value` stays the parent's.
  - With `bind:value`, Svelte's controlled form, a selection calls `onValueChange` and then updates the bound `value`.
-->
<script lang="ts">
  import { autoUpdate, computePosition, flip, offset, size as sizeMiddleware } from '@floating-ui/dom';
  import { Virtualizer, elementScroll, observeElementOffset, observeElementRect } from '@tanstack/virtual-core';
  import { getAllContexts, onDestroy, untrack, type Snippet } from 'svelte';
  import { renderApart } from '#combobox-text';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import ChipRemovable from '../chip/ChipRemovable.svelte';
  import ContentView from '../content.svelte';
  import Spinner from '../spinner/Spinner.svelte';
  import type { Content } from '../types';
  import ValidationMessage from '../validation-message/ValidationMessage.svelte';
  import { prefix, removePrefix, setComboboxContext, type ComboboxItem, type OptionEntry } from './context';
  import {
    HIDDEN_STYLE,
    addPreviouslyFocusedElement,
    enqueueFocus,
    findNonDisabledIndex,
    getMaxIndex,
    getMinIndex,
    getPreviouslyFocusedElement,
    isIndexOutOfBounds,
    isSafari,
    isVirtualClick,
    isVirtualPointerEvent,
    markOthers,
    stopEvent,
    tabbable,
  } from './floating';
  import Icon from './Icon.svelte';
  import OptionButton from './OptionButton.svelte';
  import { CHEVRON_DOWN, CHEVRON_UP, PADLOCK_LOCKED_FILL, XMARK } from './icons';
  import Pass from './Pass.svelte';

  type Props = Omit<HTMLInputAttributes, 'size' | 'value' | 'children'> & {
    /** The label, in a `label` element. */
    label?: Content;
    /** Visually hides `label` and `description` (still read by screen readers). */
    hideLabel?: boolean;
    /** The selected values; one at most without `multiple`. Bindable. */
    value?: string[];
    /** The values selected at first. */
    initialValue?: string[];
    /** Called with the selected values when they change. */
    onValueChange?: (value: string[]) => void;
    /** Lets the user select several options. */
    multiple?: boolean;
    /** The name of a hidden `select` with the selected values, for forms. */
    name?: string;
    /** The input's `size` attribute. */
    htmlSize?: number;
    /** Hides the chips of the selected options (with `multiple`). */
    hideChips?: boolean;
    /** Hides the button that clears the selection. */
    hideClearButton?: boolean;
    /** The label of the clear button. Default `Fjern alt`. */
    clearButtonLabel?: string;
    /** Renders only the visible options of the list (with @tanstack/virtual-core). */
    virtual?: boolean;
    /** The text in the input. */
    inputValue?: string;
    /** Sets `aria-busy`, and shows `loadingLabel` with a spinner instead of the options. */
    loading?: boolean;
    /** Default `Laster...`. */
    loadingLabel?: string;
    /** Whether an option matches the typed text. Default: its label starts with the text, ignoring case. */
    filter?: (inputValue: string, option: ComboboxItem) => boolean;
    /** The screen reader label of a chip. Default `Slett <label>`. */
    chipSrLabel?: (option: ComboboxItem) => string;
    /** Puts the list at the end of `body`; `false` puts it at the end of the Combobox. Default `true`. */
    portal?: boolean;
    error?: Content;
    errorId?: string;
    description?: Content;
    /** Default `md`. */
    size?: 'sm' | 'md' | 'lg' | (string & {});
    children?: Snippet;
    /** The input. */
    ref?: HTMLInputElement;
  };

  let {
    value = $bindable(),
    // The parent's `value` itself: after `value = …`, it has the new value only if the parent bound `value`.
    value: parentValue,
    initialValue = [],
    onValueChange,
    label,
    hideLabel = false,
    description,
    multiple = false,
    disabled = false,
    readonly = false,
    hideChips = false,
    clearButtonLabel = 'Fjern alt',
    hideClearButton = false,
    error,
    errorId: errorIdProp,
    id: idProp,
    name,
    portal = true,
    htmlSize = 0,
    virtual = false,
    children,
    style,
    size = 'md',
    loading,
    loadingLabel = 'Laster...',
    filter,
    chipSrLabel = (option: ComboboxItem) => 'Slett ' + option.label,
    class: className,
    inputValue: inputValueProp,
    'aria-describedby': ariaDescribedby,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const uid = $props.id();

  // useFormField
  const inputId = $derived(idProp ?? `combobox-${uid}`);
  const errorId = $derived(errorIdProp ?? `combobox-error-${uid}`);
  const descriptionId = `combobox-description-${uid}`;
  const hasError = $derived(!disabled && !!error);
  const describedBy = $derived(
    [ariaDescribedby, !!description && typeof description === 'string' && descriptionId, hasError && errorId].filter(Boolean).join(' ') || undefined,
  );

  // useFloating: the list's id, and its portal's.
  const floatingId = `${uid}-listbox`;
  const portalId = `${uid}-portal`;

  // svelte-ignore state_referenced_locally
  let inputValue = $state(inputValueProp || '');
  $effect(() => {
    if (typeof inputValueProp === 'string') inputValue = inputValueProp;
  });

  // The options register themselves (in the `collect` pass). A plain list and a version: on the server, nothing reads
  // the options before they have all registered.
  const entries: OptionEntry[] = [];
  let version = $state(0);
  const register = (entry: OptionEntry) => {
    entries.push(entry);
    version++;
    return () => {
      entries.splice(entries.indexOf(entry), 1);
      version++;
    };
  };

  /** The options in the order of the children, as React reads them: an option added between others goes there. */
  const ordered = $derived.by(() => {
    void version;
    // In the browser, by where their `template`s are in the collect pass; on the server, they register in order.
    if (!entries.every((entry) => entry.node)) return [...entries];
    return [...entries].sort((a, b) => (a.node!.compareDocumentPosition(b.node!) & 4 /* DOCUMENT_POSITION_FOLLOWING */ ? -1 : 1));
  });

  /** useCombobox's `options`: by prefixed value, a later duplicate replacing the earlier one in its place. The same
   * object until an option changes (React's changes with its children, on every render of the parent). */
  let previousOptions: Record<string, ComboboxItem> = {};
  const sameItem = (a: ComboboxItem | undefined, b: ComboboxItem) =>
    !!a && a.value === b.value && a.label === b.label && a.displayValue === b.displayValue && a.description === b.description;
  const options = $derived.by(() => {
    const all: Record<string, ComboboxItem> = {};
    for (const entry of ordered) {
      if (entry.key in all) console.warn(`Combobox has multiple options with the same value: ${entry.item.value}`);
      all[entry.key] = entry.item;
    }
    const keys = Object.keys(all);
    const previousKeys = Object.keys(previousOptions);
    const same = keys.length === previousKeys.length && keys.every((key, i) => key === previousKeys[i] && sameItem(previousOptions[key], all[key]));
    return same ? previousOptions : (previousOptions = all);
  });
  const entryByKey = $derived(new Map(ordered.map((entry) => [entry.key, entry])));

  const initialSelection = () =>
    (initialValue ?? []).map(prefix).reduce<Record<string, ComboboxItem>>((acc, key) => {
      if (options[key]) acc[key] = options[key];
      return acc;
    }, {});
  // React's initial state comes from the options of the first render; here, from the options once they have registered.
  let selectedState = $state.raw<Record<string, ComboboxItem>>();
  const selectedOptions = $derived(selectedState ?? initialSelection());
  $effect(() => {
    untrack(() => (selectedState ??= initialSelection()));
  });

  const filterFn = $derived(filter ?? ((text: string, option: ComboboxItem) => option.label.toLowerCase().startsWith(text.toLowerCase())));
  const filteredOptions = $derived(
    Object.keys(options).filter(
      (key) =>
        (!multiple && Object.keys(selectedOptions).length === 1) || (multiple && selectedOptions[key]) || filterFn(inputValue, options[key]),
    ),
  );

  let open = $state(false);
  // ComboboxIdContext
  let activeIndex = $state(0);

  let rootEl = $state<HTMLDivElement>();
  let wrapperEl = $state<HTMLDivElement>();
  let floatingEl = $state<HTMLDivElement>();
  let clearButtonEl = $state<HTMLButtonElement>();
  let startDismissEl = $state<HTMLButtonElement>();
  let endDismissEl = $state<HTMLButtonElement>();

  /** setReactInputValue: sets the input's text and fires `change`, which reaches the input's change handler. */
  function setInputValueFromCode(text: string) {
    const input = ref;
    if (!input) return;
    const previous = input.value;
    input.value = text;
    const event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
    if (previous !== text) handleInputChange(input, event);
  }

  // `value` sets the selection, and without `multiple` the text: as React's effects on `[multiple, value, options]`, when
  // one of them changes.
  let seen: { multiple: boolean; value: string[] | undefined; options: Record<string, ComboboxItem> } | undefined;
  $effect(() => {
    const changed = !seen || seen.multiple !== multiple || seen.value !== value || seen.options !== options;
    seen = { multiple, value, options };
    if (!changed || !value) return;
    const current = value;
    untrack(() => {
      if (current.length > 0 && !multiple) setInputValueFromCode(options[prefix(current[0])]?.label || '');
      // React fails on a value without an option; here it is left out.
      const updated = current.map((item) => options[prefix(item)]).filter(Boolean);
      selectedState = Object.fromEntries(updated.map((option) => [prefix(option.value), option]));
    });
  });

  const emit = (values: string[]) => {
    onValueChange?.(values);
    // Updates a bound `value` (also one that starts out undefined). React's Combobox never sets `value`: one that isn't
    // bound stays the parent's.
    value = values;
    if (parentValue !== value) value = parentValue;
  };

  type Snapshot = {
    selectedOptions: Record<string, ComboboxItem>;
    multiple: boolean;
    activeIndex: number;
    open: boolean;
    inputValue: string;
    filteredOptions: string[];
    options: Record<string, ComboboxItem>;
  };
  /** React's handlers see the state of the render they come from: the state when the event happened. */
  const snapshot = (): Snapshot => ({ selectedOptions, multiple, activeIndex, open, inputValue, filteredOptions, options });

  type SelectArgs = { option?: ComboboxItem | null; clear?: boolean; remove?: boolean };

  function handleSelectOption({ option, clear, remove }: SelectArgs, state: Snapshot) {
    if (clear) {
      selectedState = {};
      setInputValueFromCode('');
      emit([]);
      return;
    }
    if (!option) return;
    if (remove) {
      const next = { ...state.selectedOptions };
      delete next[prefix(option.value)];
      selectedState = next;
      emit(Object.keys(next).map(removePrefix));
      return;
    }
    const next = { ...state.selectedOptions };
    if (state.multiple) {
      if (next[prefix(option.value)]) delete next[prefix(option.value)];
      else next[prefix(option.value)] = option;
      setInputValueFromCode('');
      ref?.focus();
    } else {
      for (const key of Object.keys(next)) delete next[key];
      next[prefix(option.value)] = option;
      setInputValueFromCode(option?.label || '');
      setTimeout(() => ref?.setSelectionRange(option?.label?.length || 0, option?.label?.length || 0), 0);
    }
    selectedState = next;
    emit(Object.keys(next).map(removePrefix));
    if (!state.multiple) open = false;
    wrapperEl?.focus();
  }

  // useDebounceCallback(handleSelectOption, 50)
  let selectTimeout: ReturnType<typeof setTimeout> | undefined;
  function debouncedSelect(args: SelectArgs, state = snapshot()) {
    clearTimeout(selectTimeout);
    selectTimeout = setTimeout(() => handleSelectOption(args, state), 50);
  }

  /** ComboboxInput's onChange. */
  function handleInputChange(input: HTMLInputElement, event: Event) {
    const text = input.value;
    inputValue = text;
    activeIndex = 0;
    for (const option of Object.values(options)) {
      if (option.label.toLowerCase() === text.toLowerCase()) {
        if (selectedOptions[prefix(option.value)]) continue;
        debouncedSelect({ option });
      }
    }
    if (!open) open = true;
    (rest.oninput as ((event: Event) => void) | undefined)?.(event);
  }

  // useComboboxKeyboard, debounced by 20 ms, with the state of the keydown.
  let keyTimeout: ReturnType<typeof setTimeout> | undefined;
  function handleKeyDown(event: KeyboardEvent, state: Snapshot) {
    clearTimeout(keyTimeout);
    keyTimeout = setTimeout(() => {
      // React passes useFormField's readOnly, which it never sets: the keys work on a read-only Combobox too.
      if (disabled) return;
      switch (event.key) {
        case 'ArrowDown':
          if (state.open) break;
          open = true;
          break;
        case 'ArrowUp':
          if (state.activeIndex !== 0) break;
          open = false;
          break;
        case 'Enter': {
          if (!state.open) break;
          const option = state.filteredOptions[state.activeIndex];
          debouncedSelect({ option: state.options[option] }, state);
          break;
        }
        case 'Backspace': {
          if (!state.multiple || state.inputValue === '') {
            const lastOption = Object.keys(state.selectedOptions).pop();
            if (lastOption) debouncedSelect({ option: state.selectedOptions[lastOption], remove: true }, state);
          }
          break;
        }
      }
    }, 20);
  }

  onDestroy(() => {
    clearTimeout(selectTimeout);
    clearTimeout(keyTimeout);
  });

  // useFloating's onOpenChange, as useFloatingCombobox sets it: the list opens and closes a millisecond later.
  let openEvent: Event | undefined;
  let preventReturnFocus = false;
  function onOpenChange(next: boolean, event?: Event, reason?: string) {
    openEvent = next ? event : undefined;
    // FloatingFocusManager listens: where focus returns on close.
    if (reason === 'escape-key' && wrapperEl) addPreviouslyFocusedElement(wrapperEl);
    if (reason === 'outside-press' && event) preventReturnFocus = !(isVirtualClick(event) || isVirtualPointerEvent(event));
    if (!next) activeIndex = 0;
    if (floatingEl && !next) floatingEl.scrollTop = 0;
    setTimeout(() => (open = next), 1);
  }

  // useListNavigation, virtual (focus stays in the input; aria-activedescendant points at the active option). Combobox
  // enables it only while the list is open, so its keys do nothing on a closed list, and closing doesn't reset it.
  const listRef: (HTMLElement | null)[] = [];
  let indexRef = -1;
  let isPointerModality = true;
  let forceScrollIntoView = false;
  let activeId = $state<string>();
  const onNavigate = (index: number | null) => (activeIndex = index || 0);

  function focusItem(forceScroll = false) {
    const initialItem = listRef[indexRef];
    if (initialItem) activeId = initialItem.id;
    requestAnimationFrame(() => {
      const waitedItem = listRef[indexRef] || initialItem;
      if (!waitedItem) return;
      if (!initialItem) activeId = waitedItem.id;
      if (forceScroll || !isPointerModality) waitedItem.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    });
  }

  // Makes the active option the virtually focused one.
  $effect(() => {
    if (!open || !floatingEl) return;
    const index = activeIndex;
    untrack(() => {
      if (isIndexOutOfBounds(listRef, index)) return;
      indexRef = index;
      focusItem(forceScrollIntoView);
      forceScrollIntoView = false;
    });
  });

  function navigate(event: KeyboardEvent) {
    isPointerModality = false;
    const currentIndex = indexRef;
    const minIndex = getMinIndex(listRef);
    const maxIndex = getMaxIndex(listRef);
    if (event.key === 'Home') {
      stopEvent(event);
      indexRef = minIndex;
      onNavigate(indexRef);
    }
    if (event.key === 'End') {
      stopEvent(event);
      indexRef = maxIndex;
      onNavigate(indexRef);
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      stopEvent(event);
      if (event.key === 'ArrowDown') indexRef = Math.min(maxIndex, findNonDisabledIndex(listRef, { startingIndex: currentIndex }));
      else indexRef = Math.max(minIndex, findNonDisabledIndex(listRef, { startingIndex: currentIndex, decrement: true }));
      onNavigate(isIndexOutOfBounds(listRef, indexRef) ? null : indexRef);
    }
  }


  // useDismiss: Escape, and a press outside the input and the list, close it.
  function closeOnEscapeKeyDown(event: KeyboardEvent) {
    if (!open || event.key !== 'Escape') return;
    event.stopPropagation();
    onOpenChange(false, event, 'escape-key');
  }

  function closeOnPressOutside(event: PointerEvent) {
    const target = event.target as Element | null;
    const markers = document.querySelectorAll('[data-floating-ui-inert]');
    let targetRootAncestor = target instanceof Element ? target : null;
    while (targetRootAncestor) {
      const parent = targetRootAncestor.parentElement;
      if (!parent || parent === document.body || parent === document.documentElement) break;
      targetRootAncestor = parent;
    }
    // A click on something added after the list opened (it isn't marked) is left alone.
    if (
      markers.length &&
      target instanceof Element &&
      target !== document.body &&
      target !== document.documentElement &&
      !target.contains(floatingEl ?? null) &&
      Array.from(markers).every((marker) => !targetRootAncestor?.contains(marker))
    )
      return;
    if (target && (floatingEl?.contains(target) || wrapperEl?.contains(target))) return;
    onOpenChange(false, event, 'outside-press');
  }

  $effect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => closeOnEscapeKeyDown(event);
    const onPointerDown = (event: PointerEvent) => closeOnPressOutside(event);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  });

  // Positions the list under the input, as wide as it, at most 200px high.
  let x = $state(0);
  let y = $state(0);
  const dpr = () => (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
  const roundByDPR = (n: number) => Math.round(n * dpr()) / dpr();
  $effect(() => {
    const reference = wrapperEl;
    const floating = floatingEl;
    if (!open || !reference || !floating) return;
    const update = () =>
      computePosition(reference, floating, {
        placement: 'bottom',
        strategy: 'absolute',
        middleware: [
          flip({ padding: 10 }),
          sizeMiddleware({
            apply({ rects, elements }) {
              requestAnimationFrame(() => {
                Object.assign(elements.floating.style, { width: `${rects.reference.width}px`, maxHeight: `200px` });
              });
            },
          }),
          offset(10),
        ],
      }).then((data) => {
        if (floatingEl !== floating) return;
        x = roundByDPR(data.x);
        y = roundByDPR(data.y);
      });
    const cleanup = autoUpdate(reference, floating, update);
    return () => {
      cleanup();
      floating.scrollTop = 0;
    };
  });

  // FloatingFocusManager (modal, guards, visually hidden dismiss buttons, no initial focus): hides the rest of the page
  // from assistive technology while the list is open, and returns focus on close.
  const guardRole = $derived(open && isSafari() ? 'button' : undefined);
  $effect(() => {
    const floating = floatingEl;
    if (!floating) return;
    const inside = [floating, startDismissEl, endDismissEl].filter((el) => el != null);
    return markOthers(inside, true, false);
  });
  $effect(() => {
    const floating = floatingEl;
    if (!floating) return;
    const previouslyFocused = document.activeElement;
    untrack(() => addPreviouslyFocusedElement(previouslyFocused));
    preventReturnFocus = false;
    return () => {
      const activeEl = document.activeElement;
      const isFocusInside = floating.contains(activeEl);
      const shouldFocusReference = isFocusInside || (openEvent && ['click', 'mousedown'].includes(openEvent.type));
      if (shouldFocusReference && wrapperEl) addPreviouslyFocusedElement(wrapperEl);
      queueMicrotask(() => {
        const returnElement = getPreviouslyFocusedElement();
        if (
          !preventReturnFocus &&
          returnElement instanceof HTMLElement &&
          (returnElement !== activeEl && activeEl !== document.body ? isFocusInside : true)
        )
          returnElement.focus();
      });
    };
  });
  $effect(() => {
    const floating = floatingEl;
    if (!floating) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && floating.contains(document.activeElement) && tabbable(floating).length === 0) stopEvent(event);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  });
  // The guards around the list (modal): focus wraps to the list's last or first tabbable element (it has none).
  const floatingTabbables = () => (floatingEl ? tabbable(floatingEl) : []);

  // useVirtualizer, as @tanstack/react-virtual sets it up: the list scrolls, the rows are 70px until measured.
  let virtualVersion = $state(0);
  const count = $derived(filteredOptions.length);
  const virtualOptions = () => ({
    count,
    getScrollElement: () => (virtual ? (floatingEl ?? null) : null),
    estimateSize: () => 70,
    measureElement: (element: Element) => element.getBoundingClientRect().height,
    overscan: 7,
    observeElementRect,
    observeElementOffset,
    scrollToFn: elementScroll,
    onChange: () => virtualVersion++,
  });
  const virtualizer = typeof window === 'undefined' ? undefined : new Virtualizer<HTMLDivElement, Element>(untrack(virtualOptions));
  $effect.pre(() => {
    virtualizer?.setOptions(virtualOptions());
  });
  $effect(() => virtualizer?._didMount());
  $effect(() => {
    void count;
    void floatingEl;
    void virtual;
    return untrack(() => virtualizer?._willUpdate());
  });
  const virtualItems = $derived.by(() => {
    void virtualVersion;
    void count;
    return virtualizer?.getVirtualItems() ?? [];
  });
  const totalSize = $derived.by(() => {
    void virtualVersion;
    void count;
    return virtualizer?.getTotalSize() ?? 0;
  });

  setComboboxContext({
    get size() {
      return size;
    },
    get multiple() {
      return multiple;
    },
    get virtual() {
      return virtual;
    },
    get selectedOptions() {
      return selectedOptions;
    },
    get filteredOptions() {
      return filteredOptions;
    },
    get activeIndex() {
      return activeIndex;
    },
    register,
    onOptionClick: (optionValue) => {
      if (readonly || disabled) return;
      debouncedSelect({ option: options[prefix(optionValue)] });
    },
    setListRef: (index, node) => {
      listRef[index] = node;
    },
    syncItem: (node) => {
      if (!open) return;
      const index = listRef.indexOf(node);
      if (index !== -1) onNavigate(index);
    },
  });

  // The collect pass: the children rendered apart from the page, so the options register (Pass, context.ts). While
  // hydrating (the id comes from the server), mounting elsewhere would break hydration: it starts once mounted.
  const collectContexts = new Map(getAllContexts());
  const collect = () =>
    renderApart(
      Pass,
      {
        mode: 'collect',
        get children() {
          return children;
        },
      },
      collectContexts,
    );
  if (typeof window === 'undefined' || /^c\d+$/.test(uid)) onDestroy(collect());
  else $effect(() => untrack(collect));

  const showClearButton = $derived(!hideClearButton && Object.keys(selectedOptions).length > 0);
  const selectedValues = $derived(Object.keys(selectedOptions).map(removePrefix));
  const ariaActiveDescendant = $derived(open ? activeId : undefined);
  const loadingId = `${uid}-loading`;
</script>

<div bind:this={rootEl} class={['ds-combobox', `ds-combobox--${size}`, disabled && 'ds-combobox__disabled', className]} {style}>
  {#if name}
    <select {name} {multiple} style="display: none;">
      {#each selectedValues as item (item)}<option value={item} selected></option>{/each}
    </select>
  {/if}
  {#if label}
    <label class={['ds-label', 'ds-combobox__label', hideLabel && 'ds-sr-only']} data-size={size} for={inputId}
      >{#if readonly}<Icon d={PADLOCK_LOCKED_FILL} evenodd aria-hidden="true" class="ds-combobox__readonly__icon" />{/if}<ContentView
        content={label}
      /></label
    >
  {/if}
  {#if description}
    <div id={descriptionId} class={['ds-paragraph', 'ds-combobox__description', hideLabel && 'ds-sr-only']} data-size={size}
      ><ContentView content={description} /></div
    >
  {/if}
  <!-- The reference element of the list: useInteractions' reference props, with Combobox's own handlers last. -->
  <!-- svelte-ignore a11y_no_static_element_interactions, a11y_aria_activedescendant_has_tabindex -->
  <div
    bind:this={wrapperEl}
    aria-activedescendant={ariaActiveDescendant}
    onkeydown={(event) => {
      const state = snapshot();
      closeOnEscapeKeyDown(event);
      if (open) navigate(event);
      handleKeyDown(event, state);
    }}
    onclick={(event) => {
      if (disabled || readonly) return;
      if (clearButtonEl?.contains(event.target as Node)) return;
      open = !open;
      activeIndex = 0;
      ref?.focus();
    }}
    onkeypress={(event) => {
      if (event.key === 'Enter') event.preventDefault();
    }}
    aria-disabled={disabled ? 'true' : undefined}
    class={['ds-paragraph', 'ds-textfield__input', 'ds-combobox__input__wrapper', readonly && 'ds-combobox--readonly', error && 'ds-combobox--error']}
    data-size={size}
  >
    <div class="ds-combobox__chip-and-input">
      {#if multiple && !hideChips}
        {#each Object.keys(selectedOptions) as key (key)}
          {@const option = selectedOptions[key]}
          <ChipRemovable
            data-size={size}
            {disabled}
            onkeydown={(event) => {
              if (readonly || disabled) return;
              if (event.key === 'Enter') {
                event.stopPropagation();
                debouncedSelect({ option, remove: true });
                ref?.focus();
              }
            }}
            onclick={() => {
              if (readonly || disabled) return;
              debouncedSelect({ option, remove: true });
            }}
            aria-label={chipSrLabel(option)}>{option.label}</ChipRemovable
          >
        {/each}
      {/if}
      <input
        bind:this={ref}
        aria-activedescendant={ariaActiveDescendant}
        {readonly}
        aria-autocomplete="list"
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? floatingId : undefined}
        autocomplete="off"
        size={htmlSize > 0 ? htmlSize : undefined}
        value={inputValue}
        {...rest}
        aria-busy={loading}
        id={inputId}
        {disabled}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={describedBy}
        class="ds-paragraph ds-combobox__input"
        data-size={size}
        oninput={(event) => handleInputChange(event.currentTarget, event)}
      />
    </div>
    {#if showClearButton}
      <button
        bind:this={clearButtonEl}
        {disabled}
        class="ds-combobox__clear-button ds-focus"
        onclick={() => {
          if (readonly || disabled) return;
          debouncedSelect({ option: null, clear: true });
        }}
        onkeydown={(event) => {
          if (readonly || disabled) return;
          if (event.key === 'Enter') {
            event.stopPropagation();
            debouncedSelect({ option: null, clear: true });
          }
        }}
        type="button"
        aria-label={clearButtonLabel}><Icon d={XMARK} height="1.5em" width="1.5em" title="Clear selection" /></button
      >
    {/if}
    <div class="ds-combobox__arrow"
      >{#if open}<Icon d={CHEVRON_UP} evenodd title="arrow up" height="1.5em" width="1.5em" />{:else}<Icon
          d={CHEVRON_DOWN}
          evenodd
          title="arrow down"
          height="1.5em"
          width="1.5em"
        />{/if}</div
    >
  </div>
  <div class="ds-combobox__error-message" id={errorId} aria-live="polite" aria-relevant="additions removals"
    >{#if error}<ValidationMessage data-size={size}><ContentView content={error} /></ValidationMessage>{/if}</div
  >
</div>
{#if open}<div
    id={portalId}
    data-floating-ui-portal=""
    {@attach (node) => {
      (portal ? document.body : rootEl)?.appendChild(node);
      return () => node.remove();
    }}
  >
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <span
      data-type="inside"
      tabindex="0"
      role={guardRole}
      aria-hidden={guardRole ? undefined : 'true'}
      data-floating-ui-focus-guard=""
      style={HIDDEN_STYLE}
      onfocus={() => enqueueFocus(floatingTabbables().at(-1))}
    ></span>
    <button bind:this={startDismissEl} type="button" tabindex="-1" style={HIDDEN_STYLE} onclick={(event) => onOpenChange(false, event)}>Dismiss</button>
    <!-- svelte-ignore a11y_role_supports_aria_props -->
    <div
      bind:this={floatingEl}
      aria-labelledby={inputId}
      aria-autocomplete="list"
      tabindex="-1"
      data-floating-ui-focusable=""
      style:position="absolute"
      style:left="0px"
      style:top="0px"
      style:transform="translate({x}px, {y}px)"
      style:will-change={dpr() >= 1.5 ? 'transform' : undefined}
      id={floatingId}
      role="listbox"
      aria-orientation="vertical"
      aria-activedescendant={ariaActiveDescendant}
      onkeydown={(event) => {
        closeOnEscapeKeyDown(event);
        if (open) navigate(event);
      }}
      onpointermove={() => (isPointerModality = true)}
      class={['ds-combobox__options-wrapper', `ds-combobox--${size}`]}
    >
      {#if virtual}
        <div style="height: {totalSize}px; width: 100%; position: relative;">
          {#each virtualItems as row (row.index)}
            {@const entry = entryByKey.get(filteredOptions[row.index])}
            <div
              {@attach (node) => {
                virtualizer?.measureElement(node);
                return () => virtualizer?.measureElement(null);
              }}
              data-index={row.index}
              style="position: absolute; top: 0px; left: 0px; width: 100%; transform: translateY({row.start}px);"
            >{#if entry}<OptionButton {...entry.props} bind:ref={() => entry.ref, (node) => (entry.ref = node)} />{/if}</div
            >
          {/each}
        </div>
      {/if}
      {#if loading}
        <!-- ComboboxCustom, as React renders it for the loading state: the first item of the list. -->
        <div
          {@attach (node) => {
            listRef[0] = node;
            return () => (listRef[0] = null);
          }}
          tabindex="-1"
          class="ds-label ds-combobox__custom ds-combobox__loading"
          id={loadingId}
          role="option"
          aria-selected={activeIndex === 0}
          data-active={activeIndex === 0}
          data-size={size}
          onfocus={(event) => {
            const index = listRef.indexOf(event.currentTarget);
            if (open && index !== -1) onNavigate(index);
          }}
          onmousemove={(event) => {
            const index = listRef.indexOf(event.currentTarget);
            if (open && index !== -1) onNavigate(index);
          }}
        ><Spinner aria-label="Laster" data-size="sm" />{loadingLabel}</div
        >
      {:else}
        <!-- React's restChildren, then the options that pass the filter. -->
        <Pass mode="list">{@render children?.()}</Pass>
        {#if !virtual}
          {#each filteredOptions as key (key)}
            {@const entry = entryByKey.get(key)}
            {#if entry}<OptionButton {...entry.props} bind:ref={() => entry.ref, (node) => (entry.ref = node)} />{/if}
          {/each}
        {/if}
      {/if}
    </div>
    <button bind:this={endDismissEl} type="button" tabindex="-1" style={HIDDEN_STYLE} onclick={(event) => onOpenChange(false, event)}>Dismiss</button>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <span
      data-type="inside"
      tabindex="0"
      role={guardRole}
      aria-hidden={guardRole ? undefined : 'true'}
      data-floating-ui-focus-guard=""
      style={HIDDEN_STYLE}
      onfocus={() => enqueueFocus(floatingTabbables()[0])}
    ></span>
  </div>{/if}
