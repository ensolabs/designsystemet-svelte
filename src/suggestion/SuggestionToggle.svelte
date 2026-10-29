<!-- The button that opens and closes Suggestion.List. `aria-label` defaults to «Valg». -->
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLButtonAttributes & { ref?: HTMLButtonElement };

  let { 'aria-label': label = 'Valg', children, ref = $bindable(), ...rest }: Props = $props();
</script>

<button bind:this={ref} aria-expanded="false" aria-label={label} type="button" {...rest}>{@render children?.()}</button>
