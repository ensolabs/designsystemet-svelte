<!-- Svelte twins of packages/react/src/components/details/details.stories.tsx. -->
<script module lang="ts">
  import { Button, Card, Details, Heading, Link, Paragraph } from '../../../src';
  import Controlled from './details/Controlled.svelte';

  export { Preview, InCard, InCardNested, InCardWithColor, ControlledStory as Controlled, WithDirectContent };
</script>

{#snippet Preview()}
  <Details>
    <Details.Summary>Hvem kan registrere seg i Frivillighetsregisteret?</Details.Summary>
    <Details.Content>
      For å kunne bli registrert i Frivillighetsregisteret, må organisasjonen drive frivillig virksomhet. Det er bare
      foreninger, stiftelser og aksjeselskap som kan registreres. Virksomheten kan ikke dele ut midler til fysiske
      personer. Virksomheten må ha et styre.
    </Details.Content>
  </Details>
{/snippet}

{#snippet InCard()}
  <Card data-color="neutral">
    <Details>
      <Details.Summary>Vedlegg</Details.Summary>
      <Details.Content>
        <Heading>
          <a href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">Heading with link</a>
        </Heading>
        <p>Vedlegg 1, vedlegg 2, vedlegg 3</p>
      </Details.Content>
    </Details>
  </Card>
{/snippet}

{#snippet InCardNested()}
  <Card variant="tinted">
    <Heading>Test-kort</Heading>
    <Card variant="default">
      <Details>
        <Details.Summary>Test</Details.Summary>
        <Details.Content>Test 2</Details.Content>
      </Details>
    </Card>
  </Card>
{/snippet}

{#snippet jegerDetails()}
  <Details>
    <Details.Summary>Hvordan får jeg tildelt et jegernummer?</Details.Summary>
    <Details.Content>
      Du vil automatisk få tildelt jegernummer og bli registrert i Jegerregisteret når du har bestått jegerprøven.
    </Details.Content>
  </Details>
  <Details>
    <Details.Summary>Jeg har glemt jegernummeret mitt. Hvor finner jeg dette?</Details.Summary>
    <Details.Content>
      <Paragraph>
        Du kan finne dette ved å logge inn på{' '}
        <Link href="https://minjegerside.brreg.no/">Min side</Link>
      </Paragraph>
    </Details.Content>
  </Details>
{/snippet}

{#snippet InCardWithColor()}
  <Card data-color="accent">{@render jegerDetails()}</Card>
  <br />
  <Card data-color="accent" variant="tinted">{@render jegerDetails()}</Card>
{/snippet}

{#snippet ControlledStory()}<Controlled />{/snippet}

{#snippet WithDirectContent()}
  <Card>
    <Details>
      <Details.Summary>Vedlegg</Details.Summary>
      <Button>Knapp</Button>
    </Details>
  </Card>
{/snippet}
