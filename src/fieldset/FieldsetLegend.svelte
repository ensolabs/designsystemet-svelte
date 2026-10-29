<!-- The `legend` of a Fieldset, styled as a Label. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import Label from '../label/Label.svelte';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLLegendElement> & { ref?: HTMLLegendElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<Label {...rest as Record<string, unknown>}>
  {#snippet child({ props })}<legend bind:this={ref} {...props}>{@render children?.()}</legend>{/snippet}
</Label>
