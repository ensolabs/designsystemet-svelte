<!-- Text before or after an input, inside Field.Affixes. Hidden from screen readers; say the same in the label. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLSpanElement> & { ref?: HTMLSpanElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<span bind:this={ref} class={['ds-field-affix', className]} aria-hidden="true" {...rest}>{@render children?.()}</span>
