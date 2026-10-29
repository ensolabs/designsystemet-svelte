<!--
  Experimental, exported as `EXPERIMENTAL_AvatarStack` as in React: a `ul` of Avatars in overlapping stack (wrap each
  in an `li`). `gap`, `avatarSize` and `overlap` (a CSS length, or a number as percent of the size) set its CSS
  variables; `suffix` is text after the avatars, such as "+5". `expandable` (`true` or `fixed`) spreads them out on
  hover and focus, and makes the stack focusable.
-->
<script module lang="ts">
  /** React's `{ ...base, ...style }`: empty values are dropped, and `style` wins. */
  function mergeStyle(base: Record<string, string | undefined>, style: string | null | undefined) {
    const own = new Set((style ?? '').split(';').map((declaration) => declaration.split(':')[0].trim()));
    const declarations = Object.entries(base)
      .filter(([name, value]) => value !== undefined && value !== '' && !own.has(name))
      .map(([name, value]) => `${name}: ${value}`);
    if (style) declarations.push(style);
    return declarations.join('; ') || undefined;
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLUListElement> & {
    gap?: string;
    avatarSize?: string;
    overlap?: number | string;
    suffix?: string;
    expandable?: 'fixed' | boolean;
    ref?: HTMLUListElement;
  };

  let { class: className, gap, suffix, children, avatarSize, overlap, style, expandable, ref = $bindable(), ...rest }: Props = $props();

  const overlapValue = $derived(typeof overlap === 'number' ? `calc(var(--dsc-avatar-stack-size) / 100 * ${overlap})` : overlap);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (an expandable stack is focusable, as in React) -->
<ul
  bind:this={ref}
  class={['ds-avatar-stack', className]}
  data-expandable={expandable || undefined}
  tabindex={rest.tabindex ?? (expandable ? 0 : undefined)}
  style={mergeStyle(
    { '--dsc-avatar-stack-gap': gap, '--dsc-avatar-stack-size': avatarSize, '--dsc-avatar-stack-overlap': overlapValue },
    style,
  )}
  {...rest}
>
  {@render children?.()}{#if suffix}<li>{suffix}</li>{/if}
</ul>
