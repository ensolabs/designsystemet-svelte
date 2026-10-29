<!-- Svelte twins of packages/react/src/components/error-summary/error-summary.stories.tsx. -->
<script module lang="ts">
  import { ErrorSummary, Textfield } from '../../../src';
  import ShowHideReact_ from './error-summary/ShowHideReact.svelte';

  export { Preview, ShowHideReact, WithForm };
</script>

{#snippet Preview()}
  <ErrorSummary>
    <ErrorSummary.Heading>For å gå videre må du rette opp følgende feil:</ErrorSummary.Heading>
    <ErrorSummary.List>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#">Fødselsdato kan ikke være etter år 2005</ErrorSummary.Link>
      </ErrorSummary.Item>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#">Telefonnummer kan kun inneholde siffer</ErrorSummary.Link>
      </ErrorSummary.Item>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#">E-post må være gyldig</ErrorSummary.Link>
      </ErrorSummary.Item>
    </ErrorSummary.List>
  </ErrorSummary>
{/snippet}

{#snippet WithForm()}
  <div style="display: grid; align-items: stretch; gap: var(--ds-size-4)">
    <Textfield label="Fornavn" id="fornavn" error="Fornavn må være minst 2 tegn" />

    <Textfield label="Telefon" id="telefon" type="tel" error="Telefonnummer kan kun inneholde siffer" />

    <ErrorSummary>
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
  </div>
{/snippet}

{#snippet ShowHideReact()}<ShowHideReact_ />{/snippet}
