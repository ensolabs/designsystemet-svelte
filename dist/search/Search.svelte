<!--
  A search field: Search.Input, Search.Clear and Search.Button in designsystemet-web's `<ds-suggestion>`, which shows
  Search.Clear when the input has text and empties the input when it is pressed.
-->
<script lang="ts">
  import { customElementAttributes } from '../utilities/custom-element';
  import type { DSSuggestionElement } from '@digdir/designsystemet-web';
  import type { HTMLAttributes } from 'svelte/elements';
  import { resetClearLabel } from '../suggestion/sr-clear';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<DSSuggestionElement> & { ref?: DSSuggestionElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();

  $effect(() => resetClearLabel(ref));
</script>

<ds-suggestion bind:this={ref} class={['ds-search', className]} {...customElementAttributes(rest)}>{@render children?.()}</ds-suggestion>
