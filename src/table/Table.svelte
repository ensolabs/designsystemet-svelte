<!--
  A native `table`. `zebra` stripes the rows, `stickyHeader` keeps the head in view (give the table or a wrapper a
  height), `border` draws a rounded border, `hover` highlights the row under the pointer.
-->
<script lang="ts">
  import type { HTMLTableAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLTableAttributes, 'border'> & {
      zebra?: boolean;
      stickyHeader?: boolean;
      border?: boolean;
      hover?: boolean;
      ref?: HTMLTableElement;
    };

  let {
    zebra = false,
    stickyHeader = false,
    border = false,
    hover = false,
    class: className,
    children,
    ref = $bindable(),
    ...rest
  }: Props = $props();
</script>

<table
  bind:this={ref}
  class={['ds-table', className]}
  data-border={border || undefined}
  data-hover={hover || undefined}
  data-sticky-header={stickyHeader || undefined}
  data-zebra={zebra || undefined}
  {...rest}
>
  {@render children?.()}
</table>
