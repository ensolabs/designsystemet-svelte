<!--
  Button used for interaction. `variant` is `primary` (default), `secondary` or `tertiary`; `icon` styles an icon-only
  button; `loading` shows a Spinner (or a snippet of your own) and sets `aria-busy`. Open a dialog or popover with the
  native `command`/`commandfor` or `popovertarget` attributes; designsystemet-web polyfills them.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Spinner from '../spinner/Spinner.svelte';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLButtonAttributes, 'command' | 'commandfor'> & {
      variant?: 'primary' | 'secondary' | 'tertiary';
      icon?: boolean;
      loading?: boolean | Snippet;
      command?: string;
      commandfor?: string;
      child?: ChildSnippet;
      ref?: HTMLButtonElement;
    };

  let {
    class: className,
    children,
    child,
    icon = false,
    loading = false,
    variant,
    type,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const attrs = $derived({
    'aria-busy': Boolean(loading) || undefined,
    class: ['ds-button', className],
    'data-icon': icon || undefined,
    'data-variant': variant,
    ...rest,
  });
</script>

{#if child}
  {@render child({ props: type === undefined ? attrs : { ...attrs, type } })}
{:else}
  <button bind:this={ref} type={type ?? 'button'} {...attrs}>
    {#if loading === true}<Spinner aria-hidden="true" />{:else if loading}{@render loading()}{/if}
    {#if !(icon && loading)}{@render children?.()}{/if}
  </button>
{/if}
