<!--
  A chip that is a checkbox in a `label`, for choosing several. `data-color`, `data-size` and `data-wrap` go on the
  label; every other attribute goes on the input. Bind `checked`, or `group` for one array of values. `child` gets the
  label's attributes and an `input` snippet to render inside your element.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Input from '../input/Input.svelte';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLInputAttributes, 'type' | 'size'> & {
      'data-wrap'?: 'nowrap' | 'wrap';
      type?: 'checkbox' | 'radio';
      group?: unknown;
      child?: Snippet<[{ props: Record<string, unknown>; input: Snippet }]>;
      ref?: HTMLLabelElement;
    };

  let {
    child,
    children,
    class: className,
    'data-color': color,
    'data-size': size,
    'data-wrap': wrap,
    checked = $bindable(),
    group = $bindable(),
    ref = $bindable(),
    ...rest
  }: Props = $props();

  const attrs = $derived({ class: ['ds-chip', className], 'data-color': color, 'data-size': size, 'data-wrap': wrap });
</script>

{#snippet input()}
  <Input {...rest} type={rest.type ?? 'checkbox'} bind:checked bind:group />
{/snippet}

{#if child}
  {@render child({ props: attrs, input })}
{:else}
  <label bind:this={ref} {...attrs}>{@render input()}{@render children?.()}</label>
{/if}
