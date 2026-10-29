<!--
  @deprecated Deprecated upstream, and unused by the components (designsystemet-web handles arrow keys).

  Moves focus between its RovingFocusItems with the arrow keys, Home and End, keeping one of them in the tab order, as
  React's RovingFocusRoot. `activeValue` is the item focused when the root gets focus; `orientation` picks the arrow
  keys. With `child`, spread the props on your own element instead of the `div`.
-->
<script lang="ts">
  import { untrack } from 'svelte';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../../types';
  import { warn } from '../warn';
  import { setRovingFocusContext, type RovingFocusOrientation } from './context';

  type Props = HTMLAttributes<HTMLElement> & {
    /** The value of the item to focus when the root gets focus. */
    activeValue?: string;
    /** The arrow keys that move focus. Default `horizontal`. */
    orientation?: RovingFocusOrientation;
    child?: ChildSnippet;
    ref?: HTMLElement;
  };

  let { activeValue, child, orientation = 'horizontal', onfocusout, onfocusin, children, ref = $bindable(), ...rest }: Props = $props();

  let focusableValue = $state<string | null>(untrack(() => activeValue ?? null));
  let isShiftTabbing = $state(false);
  const elements = new Map<string, HTMLElement>();
  const refKey = createAttachmentKey();

  const getOrderedItems = () => {
    if (!ref) return [];
    const elementsFromDOM = Array.from(ref.querySelectorAll('[data-roving-tabindex-item]'));
    return Array.from(elements)
      .sort((a, b) => elementsFromDOM.indexOf(a[1]) - elementsFromDOM.indexOf(b[1]))
      .map(([value, element]) => ({ value, element }));
  };

  // React's effect that follows activeValue.
  $effect.pre(() => {
    focusableValue = activeValue ?? null;
  });

  warn('RovingFocusRoot is deprecated.');

  setRovingFocusContext({
    elements,
    getOrderedItems,
    get focusableValue() {
      return focusableValue;
    },
    setFocusableValue: (value) => (focusableValue = value),
    onShiftTab: () => (isShiftTabbing = true),
    get orientation() {
      return orientation;
    },
  });

  // React's onBlur and onFocus are focusout and focusin: they bubble from the items.
  const attrs = $derived({
    ...rest,
    tabindex: isShiftTabbing ? -1 : 0,
    onfocusout: (event: FocusEvent & { currentTarget: EventTarget & HTMLElement }) => {
      onfocusout?.(event);
      isShiftTabbing = false;
      focusableValue = activeValue ?? null;
    },
    onfocusin: (event: FocusEvent & { currentTarget: EventTarget & HTMLElement }) => {
      onfocusin?.(event);
      if (event.target !== event.currentTarget) return;
      const orderedItems = getOrderedItems();
      if (orderedItems.length === 0) return;
      if (focusableValue != null) elements.get(focusableValue)?.focus();
      else if (activeValue != null) elements.get(activeValue)?.focus();
      else orderedItems.at(0)?.element.focus();
    },
    [refKey]: (element: HTMLElement) => {
      ref = element;
      return () => void (ref = undefined);
    },
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <div {...attrs}>{@render children?.()}</div>
{/if}
