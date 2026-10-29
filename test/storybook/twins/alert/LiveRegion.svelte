<!-- WrongLiveRegionReact and CorrectLiveRegionReact: a button that shows a warning, with role="alert" on the warning
     itself (wrong) or on a wrapper that is always there (correct). -->
<script lang="ts">
  import { Alert, Button, Heading, Paragraph } from '../../../../src';

  let { correct = false }: { correct?: boolean } = $props();
  let showAlert = $state(false);
</script>

{#snippet alert(role?: 'alert')}
  <Alert data-color="warning" {role}>
    <Heading level={2} data-size="xs" style="margin-bottom: var(--ds-size-2)">Vi klarer ikke lagre skjemaet</Heading>
    <Paragraph>
      Vi har mistet forbindelsen med serveren og får ikke lagret skjemaet. Vent litt og prøv en gang til.
    </Paragraph>
  </Alert>
{/snippet}

{#if correct}
  <div role="alert">
    {#if showAlert}{@render alert()}{/if}
  </div>
{:else if showAlert}
  {@render alert('alert')}
{/if}
<Button data-size="sm" variant="secondary" onclick={() => (showAlert = !showAlert)}>
  {showAlert ? 'Skjul varsel' : 'Handling som fører til varsel'}
</Button>
