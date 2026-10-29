<!-- Holds an input and the Field.Affix text before or after it ("NOK", "pr. mnd."). -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<div bind:this={ref} class={['ds-field-affixes', className]} {...rest}>{@render children?.()}</div>
