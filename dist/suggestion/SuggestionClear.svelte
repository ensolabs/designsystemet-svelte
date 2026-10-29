<!-- The clear button of Suggestion. designsystemet-web shows it when the input has text, and labels it from `data-sr-clear`. -->
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLButtonAttributes & { ref?: HTMLButtonElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<button bind:this={ref} hidden type="reset" {...rest}>{@render children?.()}</button>
