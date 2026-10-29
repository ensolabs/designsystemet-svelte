<!-- An action in a Dropdown: a tertiary Button. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Button from '../button/Button.svelte';

  type Props = Omit<ComponentProps<typeof Button>, 'variant'>;

  let { ref = $bindable(), ...rest }: Props = $props();
</script>

<Button bind:ref variant="tertiary" {...rest} />
