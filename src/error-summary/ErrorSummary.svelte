<!--
  A summary of the errors in a form: ErrorSummary.Heading and an ErrorSummary.List of ErrorSummary.Item with an
  ErrorSummary.Link to each field. It is designsystemet-web's `<ds-error-summary>`, which focuses it when it appears
  and labels it by its heading.
-->
<script lang="ts">
  import type { DSErrorSummaryElement } from '@digdir/designsystemet-web';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<DSErrorSummaryElement> & { child?: ChildSnippet; ref?: DSErrorSummaryElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-error-summary', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <ds-error-summary bind:this={ref} {...attrs}>{@render children?.()}</ds-error-summary>
{/if}
