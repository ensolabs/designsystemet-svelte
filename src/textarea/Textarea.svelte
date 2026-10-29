<!-- A native `textarea`. Bind `value` as on a plain textarea. -->
<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLTextareaAttributes & { ref?: HTMLTextAreaElement };

  let { class: className, value = $bindable(), ref = $bindable(), ...rest }: Props = $props();
</script>

<textarea bind:this={ref} class={['ds-input', className]} bind:value {...rest}></textarea>
