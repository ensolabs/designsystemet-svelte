<!--
  Content that floats next to its trigger: a Popover.Trigger in the same Popover.TriggerContext, or any button with
  `popovertarget` set to its `id`. designsystemet-web places it. Bind `open` to control it; a click on the trigger
  or outside, or Escape, sets it and calls `onOpen`/`onClose`.
-->
<script lang="ts">
  import { untrack } from 'svelte';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';
  import { getPopoverContext, type Placement } from './context';

  type Props = DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'popover'> & {
      id?: string;
      placement?: Placement;
      open?: boolean;
      variant?: 'default' | 'tinted';
      onOpen?: () => void;
      onClose?: () => void;
      /** Accepted, as in React, and not rendered. */
      autoPlacement?: boolean;
      child?: ChildSnippet;
      ref?: HTMLElement;
    };

  let {
    id,
    class: className = '',
    onClose,
    onOpen,
    open = $bindable(),
    variant,
    placement = 'top',
    autoPlacement: _autoPlacement = true,
    child,
    children,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const IS_DROPDOWN = /(?:^|\s)ds-dropdown(?:\s|$)/;
  // With `child`, the popover element reaches the effect below through an attachment in the props.
  const refKey = createAttachmentKey();
  const attachRef = (el: HTMLElement) => {
    ref = el;
    return () => void (ref = undefined);
  };
  const context = getPopoverContext();

  let internalOpen = $state(false);
  const controlledOpen = $derived(open ?? internalOpen);

  const setOpen = (value: boolean) => {
    internalOpen = value;
    if (open !== undefined) open = value;
    if (value) onOpen?.();
    else onClose?.();
  };

  $effect(() => {
    const popover = ref;
    const isOpen = controlledOpen;
    return untrack(() => {
      const trigger = `[popovertarget="${popover?.id}"],[commandfor="${popover?.id}"]`;
      const handleClick = (event: MouseEvent) => {
        const el = event.target as Element | null;
        const isTrigger = el?.closest?.(trigger);
        const isOutside = !isTrigger && !popover?.contains(el);
        if (isTrigger) event.preventDefault();
        if (isOpen && (isTrigger || isOutside)) setOpen(false);
        else if (!isOpen && isTrigger) setOpen(true);
      };
      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen && isTopLayer(popover)) {
          event.preventDefault();
          document.querySelector<HTMLElement>(trigger)?.focus?.();
          setOpen(false);
        }
      };
      popover?.togglePopover?.(isOpen);
      if (isOpen) popover?.dispatchEvent(new CustomEvent('ds-toggle-source', { bubbles: true, composed: true, detail: document.querySelector(trigger) }));
      document.addEventListener('click', handleClick, true);
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('click', handleClick, true);
        document.removeEventListener('keydown', handleKeydown);
      };
    });
  });

  $effect(() => {
    if (id) context.popoverId = id;
  });

  const isTopLayer = (checkElement: HTMLElement | undefined) => {
    if (!checkElement) return false;
    const { x, y, width, height } = checkElement.getBoundingClientRect();
    const topElement = document.elementFromPoint(x + width / 2, y + height / 2);
    for (let el = topElement; el; el = el.parentElement) {
      if (checkElement === el) return true;
      if (el instanceof HTMLDialogElement && el.open) return false;
      if (el.classList.contains(':popover-open')) return false;
      if (el.matches(':popover-open')) return false;
    }
    return false;
  };

  const attrs = $derived({
    class: [typeof className === 'string' && IS_DROPDOWN.test(className) ? undefined : 'ds-popover', className],
    id: id || context.popoverId,
    popover: 'manual' as const,
    'data-placement': placement,
    'data-variant': variant,
    ...rest,
  });
</script>

{#if child}
  {@render child({ props: { ...attrs, [refKey]: attachRef } })}
{:else}
  <div bind:this={ref} {...attrs}>{@render children?.()}</div>
{/if}
