<!-- Validation text under a field. Inside a Field, designsystemet-web links it to the input. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLParagraphElement> & { child?: ChildSnippet; ref?: HTMLParagraphElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-validation-message', className], 'data-field': 'validation', ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <p bind:this={ref} {...attrs}>{@render children?.()}</p>
{/if}
