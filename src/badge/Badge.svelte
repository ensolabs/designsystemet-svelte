<!--
  A non-interactive status marker, with or without a number. `count` above `maxCount` shows as `maxCount+`.
  `variant` is `base` or `tinted`. Place it on another element with Badge.Position.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { count?: number; maxCount?: number; variant?: 'base' | 'tinted'; ref?: HTMLSpanElement };

  let { class: className, count, maxCount, variant, ref = $bindable(), ...rest }: Props = $props();
</script>

<span
  bind:this={ref}
  class={['ds-badge', className]}
  data-count={count && maxCount && count > maxCount ? `${maxCount}+` : count}
  data-variant={variant}
  {...rest}
></span>
