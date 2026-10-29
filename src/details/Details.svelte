<!--
  A native `details` with Details.Summary and Details.Content. Starts open with `defaultOpen`, or bind `open` to
  control it: a toggle by the user (or find-in-page) calls `onToggle` and then updates `open`. `variant` is `default`
  or `tinted`.
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
      if (open !== undefined) open = details.open;
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
