<!-- An option in Suggestion.List: a `u-option`. `value` is what is selected, `label` (or the text) what is shown. -->
<script lang="ts">
  import type { HTMLOptionAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLOptionAttributes & { ref?: HTMLOptionElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<u-option bind:this={ref} class={className} {...rest}>{@render children?.()}</u-option>
