<!-- Svelte twins of packages/react/src/components/alert/alert.stories.tsx. -->
<script module lang="ts">
  import { Alert, Heading, Link, Paragraph } from '../../../src';
  import LiveRegion from './alert/LiveRegion.svelte';

  export {
    Preview,
    VariantInfo,
    VariantSuccess,
    VariantWarning,
    VariantDanger,
    MedHeading,
    MedKunHeading,
    MedLenke,
    UtenAria,
    WrongLiveRegionReact,
    CorrectLiveRegionReact,
    MedAria,
  };
</script>

{#snippet Preview()}<Alert data-color="info">En beskjed det er viktig at brukeren ser</Alert>{/snippet}

{#snippet heading(text: string)}
  <Heading level={2} data-size="xs" style="margin-bottom: var(--ds-size-2)">{text}</Heading>
{/snippet}

{#snippet VariantInfo()}
  <Alert role="status" data-color="info">
    {@render heading('Har du husket å bestille passtime?')}
    <Paragraph>
      Det er lange køer for å bestille pass om dagen, det kan være lurt å bestille i god tid før du skal reise.
    </Paragraph>
  </Alert>
{/snippet}

{#snippet VariantSuccess()}
  <Alert role="status" data-color="success">
    {@render heading('Gratulerer! Du kan nå starte selskapet ditt')}
    <Paragraph>
      Det ser ut til at regnestykket går i pluss og at du har det som skal til for å starte selskapet ditt.
    </Paragraph>
  </Alert>
{/snippet}

{#snippet VariantWarning()}
  <Alert role="status" data-color="warning">
    {@render heading('Vi har tekniske problemer')}
    <Paragraph>Det gjør at du kan bli avbrutt mens du fyller ut skjemaet. Vi jobber med å rette problemene.</Paragraph>
  </Alert>
{/snippet}

{#snippet VariantDanger()}
  <Alert role="alert" data-color="danger">
    {@render heading('Det har skjedd en feil')}
    <Paragraph>
      Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv igjen litt senere. Hvis vi fortsatt ikke klarer å
      vise informasjonen du trenger, tar du kontakt med kundeservice på telefon 85 44 32 66.
    </Paragraph>
  </Alert>
{/snippet}

{#snippet MedHeading()}
  <Alert role="status">
    {@render heading('Har du husket å bestille passtime?')}
    <Paragraph>
      Det er lange køer for å bestille pass om dagen, det kan være lurt å bestille i god tid om du trenger pass til
      sommeren.
    </Paragraph>
  </Alert>
{/snippet}

{#snippet MedKunHeading()}
  <Alert role="status" data-color="warning">
    <Paragraph>Du har 7 dager igjen på å fullføre søknaden.</Paragraph>
  </Alert>
{/snippet}

{#snippet MedLenke()}
  <Alert role="status" data-color="warning">
    {@render heading('Søknadsfristen går ut om 3 dager')}
    <Paragraph>
      Fristen for å søke opptak til utdanning er 15. april.
      <Link href="https://designsystemet.no/">Søk nå</Link>
    </Paragraph>
  </Alert>
{/snippet}

{#snippet UtenAria()}
  <Alert role="status" data-color="warning">
    {@render heading('Nedetid')}
    <Paragraph>I natt klokken 00:00 til 02:00 vil nettsiden være nede på grunn av vedlikehold.</Paragraph>
  </Alert>
{/snippet}

{#snippet WrongLiveRegionReact()}<LiveRegion />{/snippet}

{#snippet CorrectLiveRegionReact()}<LiveRegion correct />{/snippet}

{#snippet MedAria()}
  <Alert data-color="danger" role="alert">
    {@render heading('Vi klarer ikke lagre skjemaet')}
    <Paragraph>
      Vi har mistet forbindelsen med serveren og får ikke lagret skjemaet. Vent litt og prøv en gang til.
    </Paragraph>
  </Alert>
{/snippet}
