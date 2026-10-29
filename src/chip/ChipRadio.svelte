<!-- A chip that is a radio button in a `label`, for choosing one. As Chip.Checkbox; bind `group`. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ChipCheckbox from './ChipCheckbox.svelte';

  let { group = $bindable(), checked = $bindable(), ref = $bindable(), ...rest }: ComponentProps<typeof ChipCheckbox> = $props();
</script>

<ChipCheckbox type="radio" bind:group bind:checked bind:ref {...rest} />
