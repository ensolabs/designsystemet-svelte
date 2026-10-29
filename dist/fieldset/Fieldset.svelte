<!--
  A native `fieldset` around a group of fields, with Fieldset.Legend and Fieldset.Description. designsystemet-web links
  the legend and description to it (`aria-labelledby`, `id`); don't set those yourself.
-->
<script lang="ts">
  import type { HTMLFieldsetAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLFieldsetAttributes & { ref?: HTMLFieldSetElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<fieldset bind:this={ref} class={['ds-fieldset', className]} {...rest}>{@render children?.()}</fieldset>
