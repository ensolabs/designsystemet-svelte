<!--
  The option Suggestion.List shows when nothing matches. With `creatable` on Suggestion, its `data-empty` text (with
  `%s` for the typed text) offers to create the value.
-->
<script lang="ts">
  import type { HTMLOptionAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLOptionAttributes & { 'data-empty'?: string | boolean; ref?: HTMLOptionElement };

  let { 'data-empty': empty = true, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<u-option bind:this={ref} data-empty={empty === true ? '' : empty || undefined} {...rest}>{@render children?.()}</u-option>
