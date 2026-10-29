<!--
  Positions a Badge on the element next to it. `placement` is `top-right` (default), `top-left`, `bottom-right` or
  `bottom-left`; `overlap` is `rectangle` (default) or `circle`.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps &
    HTMLAttributes<HTMLSpanElement> & {
      placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
      overlap?: 'circle' | 'rectangle';
      ref?: HTMLSpanElement;
    };

  let { class: className, overlap = 'rectangle', placement = 'top-right', children, ref = $bindable(), ...rest }: Props = $props();
</script>

<span bind:this={ref} class={['ds-badge--position', className]} data-overlap={overlap} data-placement={placement} {...rest}
  >{@render children?.()}</span
>
