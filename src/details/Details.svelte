<!--
  A native `details` with Details.Summary and Details.Content. `variant` is `default` or `tinted`. As in React:
  - Without `open`, the user opens and closes it; `defaultOpen` starts it open. A toggle calls `onToggle`.
  - With `open`, it is controlled: a toggle by the user (or find-in-page) calls `onToggle`, and the element goes back
    to `open` unless the parent changes `open` in `onToggle`.
  - With `bind:open`, Svelte's controlled form, a toggle calls `onToggle` and then updates the bound `open`.
-->
<script lang="ts">
  import { untrack } from 'svelte';
  import type { HTMLDetailsAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLDetailsAttributes, 'open'> & {
      variant?: 'default' | 'tinted';
      open?: boolean;
      defaultOpen?: boolean;
      onToggle?: (event: Event) => void;
      ref?: HTMLDetailsElement;
    };

  let {
    class: className,
    open = $bindable(),
    // The parent's `open` itself: after `open = …`, it has the new value only if the parent bound `open`.
    open: parentOpen,
    defaultOpen = false,
    variant,
    onToggle,
    children,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const initialOpen = untrack(() => defaultOpen);

  const toggle = (details: HTMLDetailsElement) => {
    const handleToggle = (event: Event) => {
      if (details.open === open) return;
      onToggle?.(event);
      if (open === undefined) return;
      open = details.open;
      if (parentOpen === details.open) return;
      // Not bound (or the parent kept its value): put the element back to `open`, as React does.
      open = parentOpen;
      details.open = Boolean(parentOpen);
    };
    details.addEventListener('toggle', handleToggle, true);
    return () => details.removeEventListener('toggle', handleToggle, true);
  };
</script>

<details
  bind:this={ref}
  class={['ds-details', className]}
  open={(open ?? initialOpen) || undefined}
  data-variant={variant}
  {@attach toggle}
  {...rest}
>
  {@render children?.()}
</details>
