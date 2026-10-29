<!-- Informs the user about something important. `data-color` is `info` (default), `success`, `warning` or `danger`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement };

  let { 'data-color': color = 'info', class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<div bind:this={ref} class={['ds-alert', className]} data-color={color} {...rest}>{@render children?.()}</div>
