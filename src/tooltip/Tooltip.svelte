<!--
  Short text shown when the user hovers over or focuses an element; designsystemet-web renders it from `data-tooltip`.
  React clones its child element; here `child` gets the attributes to spread on your own element, which must be
  focusable. Text as `children` is wrapped in a focusable `<span>`, as React does with a string child.

  ```svelte
  <Tooltip content="Slett">{#snippet child({ props })}<Button icon {...props}>…</Button>{/snippet}</Tooltip>
  <Tooltip content="Sist endret 3. mars">i går</Tooltip>
  ```
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Placement } from '../popover/context';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLAttributes<HTMLElement>, 'content'> & {
      content: string;
      placement?: Placement;
      autoPlacement?: boolean;
      open?: boolean;
      type?: 'describedby' | 'labelledby';
      child?: ChildSnippet;
      ref?: HTMLElement;
    };

  let { content, placement = 'top', autoPlacement = true, open, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({
    'data-tooltip': content,
    'data-placement': placement,
    'data-autoplacement': `${autoPlacement}`,
    ...rest,
    // React writes `open` as the boolean attribute it is on `<details>` and `<dialog>`.
    open: open ? '' : undefined,
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <span bind:this={ref} {...attrs} tabindex={0}>{@render children?.()}</span>
{/if}
