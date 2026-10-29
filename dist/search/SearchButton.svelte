<!-- The submit Button of Search. The text defaults to «Søk». -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Button from '../button/Button.svelte';

  type Props = ComponentProps<typeof Button>;

  let { children, child, type = 'submit', ref = $bindable(), ...rest }: Props = $props();
</script>

<Button bind:ref {type} {child} {...rest}>{#if children}{@render children()}{:else}Søk{/if}</Button>
