<!-- A `div` that styles the file input, label and description inside it as a drop zone. Experimental upstream. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<div bind:this={ref} class={['ds-file-upload', className]} {...rest}>{@render children?.()}</div>
