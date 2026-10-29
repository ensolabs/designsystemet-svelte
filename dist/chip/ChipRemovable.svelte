<!-- A chip button with a cross, for something the user can remove. Handle `onclick` yourself. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ChipButton from './ChipButton.svelte';

  let { ref = $bindable(), ...rest }: ComponentProps<typeof ChipButton> = $props();
</script>

<ChipButton data-removable={true} bind:ref {...rest} />
