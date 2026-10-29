<!--
  Opens the Popover in the same Popover.TriggerContext (or the one `popovertarget` names). A Button, or with `inline`
  a plain `<button>` for a trigger inside running text. As in React, `id` is dropped.
-->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Button from '../button/Button.svelte';
  import { getPopoverContext } from './context';

  /** Button props; with `inline`, only the attributes of a `<button>` apply. */
  type Props = ComponentProps<typeof Button> & { inline?: boolean };

  let { id: _id, inline, child, popovertarget, children, ref = $bindable(), ...rest }: Props = $props();

  const context = getPopoverContext();

  const attrs = $derived({
    'data-popover': inline ? 'inline' : undefined,
    popovertarget: popovertarget ?? context.popoverId,
    ...rest,
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else if inline}
  <button bind:this={ref} {...attrs as HTMLButtonAttributes}>{@render children?.()}</button>
{:else}
  <Button bind:ref {...attrs}>{@render children?.()}</Button>
{/if}
