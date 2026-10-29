<!--
  @deprecated Deprecated upstream, and unused by the components.

  An item in a RovingFocusRoot: in the tab order when it is the root's focusable item, and moving focus to the next or
  previous item with the arrow keys, or the first or last with Home and End, as React's RovingFocusItem. `value`
  identifies it; React falls back to its text children, and so does this, with the text it renders. With `child`,
  spread the props on your own element instead of the `div`.
-->
<script lang="ts">
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../../types';
  import { getRovingFocusContext, type RovingItem } from './context';

  type Props = HTMLAttributes<HTMLElement> & {
    /** The value used to decide which item gets focus. */
    value?: string;
    child?: ChildSnippet;
    ref?: HTMLElement;
  };

  let { value, child, onkeydown, children, ref = $bindable(), ...rest }: Props = $props();

  const context = getRovingFocusContext();
  const refKey = createAttachmentKey();

  // React reads a string child as the value; a snippet's text is only known once it is rendered.
  let text = $state('');
  const focusValue = $derived(value ?? text);

  const getNextFocusableValue = (items: RovingItem[], value: string) => {
    const currIndex = items.findIndex((item) => item.value === value);
    return items.at(currIndex === items.length - 1 ? 0 : currIndex + 1);
  };
  const getPrevFocusableValue = (items: RovingItem[], value: string) => {
    const currIndex = items.findIndex((item) => item.value === value);
    return items.at(currIndex === 0 ? -1 : currIndex - 1);
  };

  const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
    onkeydown?.(event);
    const items = context.getOrderedItems();
    let nextItem: RovingItem | undefined;
    switch (context.orientation) {
      case 'horizontal':
        if (event.key === 'ArrowRight') nextItem = getNextFocusableValue(items, focusValue);
        if (event.key === 'ArrowLeft') nextItem = getPrevFocusableValue(items, focusValue);
        break;
      case 'vertical':
        if (event.key === 'ArrowDown') nextItem = getNextFocusableValue(items, focusValue);
        if (event.key === 'ArrowUp') nextItem = getPrevFocusableValue(items, focusValue);
        break;
      case 'ambiguous':
        if (['ArrowRight', 'ArrowDown'].includes(event.key)) nextItem = getNextFocusableValue(items, focusValue);
        if (['ArrowLeft', 'ArrowUp'].includes(event.key)) nextItem = getPrevFocusableValue(items, focusValue);
    }
    if (event.key === 'Home') nextItem = items[0];
    if (event.key === 'End') nextItem = items[items.length - 1];
    if (nextItem) {
      event.preventDefault();
      nextItem.element.focus();
    }
    if (event.shiftKey && event.key === 'Tab') context.onShiftTab();
  };

  // React's getRovingProps go after the item's own props, so its focus handler (focusin, as React's onFocus) replaces
  // any given one, as in React.
  const attrs = $derived({
    ...rest,
    onkeydown: handleKeydown,
    onfocusin: () => context.setFocusableValue(focusValue),
    'data-roving-tabindex-item': true,
    tabindex: context.focusableValue === focusValue ? 0 : -1,
    [refKey]: (element: HTMLElement) => {
      ref = element;
      if (value === undefined) text = element.textContent ?? '';
      const key = focusValue;
      context.elements.set(key, element);
      return () => {
        context.elements.delete(key);
        ref = undefined;
      };
    },
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <div {...attrs}>{@render children?.()}</div>
{/if}
