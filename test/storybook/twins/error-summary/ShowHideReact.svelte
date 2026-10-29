<script lang="ts">
  import type { DSErrorSummaryElement } from '@digdir/designsystemet-web';
  import { Button, ErrorSummary } from '../../../../src';

  let show = $state(false);
  let summary = $state<DSErrorSummaryElement>();

  $effect(() => {
    if (show) summary?.focus();
  });
</script>

<div style="display: grid; place-items: center; margin-bottom: var(--ds-size-4)">
  <Button onclick={() => (show = !show)}>{show ? 'Skjul' : 'Send inn skjema'}</Button>
</div>
{#if show}
  <ErrorSummary data-testid="show-hide" bind:ref={summary}>
    <ErrorSummary.Heading>For å gå videre må du rette opp følgende feil:</ErrorSummary.Heading>
    <ErrorSummary.List>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#fornavn">Fornavn må være minst 2 tegn</ErrorSummary.Link>
      </ErrorSummary.Item>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#telefon">Telefonnummer kan kun inneholde siffer</ErrorSummary.Link>
      </ErrorSummary.Item>
    </ErrorSummary.List>
  </ErrorSummary>
{/if}
