<!--
  A `<dialog>`, modal unless `modal={false}`, with a close button (`closeButton` is its label; `false` leaves it
  out). Bind `open` to open and close it; it calls `onClose` when the user closes it. Or open it with a
  Dialog.Trigger in a Dialog.TriggerContext, or a Button with `command="show-modal"` and `commandfor` its `id`.
  React's `asChild` isn't ported: there it always throws, as Slot gets both the close button and the children.
-->
<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import Button from '../button/Button.svelte';
  import type { DefaultProps } from '../types';
  import { getDialogContext } from './context';

  type Props = DefaultProps &
    Omit<HTMLDialogAttributes, 'open' | 'closedby'> & {
      closeButton?: string | false;
      closedby?: 'none' | 'closerequest' | 'any';
      placement?: 'center' | 'left' | 'right' | 'top' | 'bottom';
      modal?: boolean;
      open?: boolean;
      onClose?: (event: Event) => void;
      ref?: HTMLDialogElement;
    };

  let {
    children,
    class: className,
    closeButton = 'Lukk dialogvindu',
    id,
    modal = true,
    onanimationend,
    onclick,
    onclose,
    onClose,
    open = $bindable(),
    placement = 'center',
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const context = getDialogContext();
  const autoId = $props.id();
  const usedId = $derived(id ?? autoId);
  let skipClose = false;

  $effect(() => {
    context.current = ref ?? null;
  });

  $effect(() => {
    const dialog = ref;
    if (!dialog || open === undefined || open === dialog.open) return;
    if (open) return dialog[modal ? 'showModal' : 'show']();
    skipClose = true;
    dialog.close();
  });

  type Handler<E extends Event> = (event: E & { currentTarget: EventTarget & HTMLDialogElement }) => void;

  const handleClose: Handler<Event> = (event) => {
    onclose?.(event);
    if (event.target !== event.currentTarget) return;
    if (!skipClose) {
      onClose?.(event);
      if (open !== undefined) open = false;
    }
    skipClose = false;
  };

  const handleClick: Handler<MouseEvent> = (event) => {
    onclick?.(event);
    const { currentTarget: dialog, target, defaultPrevented } = event;
    const isClose = (target as Element | null)?.closest?.('[data-command="close"]');
    if (!defaultPrevented && isClose) {
      dialog.close();
      if ((window as { dsWarnings?: boolean }).dsWarnings !== false)
        console.log('Designsystemet: data-command="close" is deprecated. Use command="close" and commandfor="DIALOG-ID" instead.');
    }
  };

  const handleAnimationEnd: Handler<AnimationEvent> = (event) => {
    onanimationend?.(event);
    if (event.currentTarget !== event.target) return;
    const autofocus = event.currentTarget.querySelector<HTMLElement>('[autofocus]');
    if (document.activeElement !== autofocus) autofocus?.focus();
  };

  const attrs = $derived({
    class: ['ds-dialog', className],
    'data-placement': placement,
    'data-modal': modal,
    id: usedId,
    onclose: handleClose,
    onclick: handleClick,
    onanimationend: handleAnimationEnd,
    ...rest,
  });
</script>

<dialog bind:this={ref} {...attrs}>
  {#if closeButton !== false}
    <Button aria-label={closeButton} data-color="neutral" icon variant="tertiary" command="close" commandfor={usedId} />
  {/if}
  {@render children?.()}
</dialog>
