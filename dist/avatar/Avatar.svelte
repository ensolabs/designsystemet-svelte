<!--
  A person or organisation as initials, a picture or an icon: a `span` with `role="img"`. Name it with `aria-label`, or
  with `data-tooltip` (designsystemet-web shows the tooltip, and the avatar becomes focusable), or hide it with
  `aria-hidden`. Without children it shows `initials`. `variant` is `circle` or `square`. With `child`, render the
  initials (or other content) in your own element; React's `asChild` adds them only when the child is empty.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = Omit<DefaultProps, 'data-size'> &
    HTMLAttributes<HTMLSpanElement> & {
      'data-size'?: 'xs' | 'sm' | 'md' | 'lg' | (string & {});
      'data-tooltip'?: string;
      'data-initials'?: string;
      variant?: 'circle' | 'square';
      initials?: string;
      child?: ChildSnippet;
      ref?: HTMLSpanElement;
    };

  let {
    'aria-label': label,
    'data-tooltip': tooltip,
    'data-initials': dataInitials,
    children,
    variant,
    class: className,
    initials: propInitials,
    child,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const initials = $derived(propInitials ?? dataInitials);
  const attrs = $derived({
    'aria-label': label || tooltip,
    class: ['ds-avatar', className],
    'data-initials': initials,
    'data-tooltip': tooltip,
    'data-variant': variant,
    role: child ? undefined : 'img',
    tabindex: tooltip ? 0 : undefined,
    ...rest,
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <span bind:this={ref} {...attrs}>{#if children}{@render children()}{:else}{initials}{/if}</span>
{/if}
