<!-- A page, previous or next button in Pagination: a Button. Spread a page's `buttonProps` from `pagination()` on it. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Button from '../button/Button.svelte';

  type Props = Omit<ComponentProps<typeof Button>, 'icon' | 'loading'>;

  let { ref = $bindable(), ...rest }: Props = $props();
</script>

<Button bind:ref {...rest} />
