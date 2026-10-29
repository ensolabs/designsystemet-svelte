<!-- Svelte twins of the stories in form.test.tsx: the same name, the same markup. -->
<script module lang="ts">
  import { Button, Field, Input, Label, Spinner, Textarea, Textfield, ValidationMessage } from '../../src';

  export { buttonPrimary, buttonVariants, buttonIcon, buttonLoading, buttonAsChild, spinner, field, textfield, textfieldFull, textfieldMultiline, inputReadOnly };
</script>

{#snippet buttonPrimary()}<Button>Lagre</Button>{/snippet}

{#snippet buttonVariants()}
  <Button variant="secondary" data-size="sm">Avbryt</Button>
  <Button variant="tertiary" data-color="danger" type="submit" disabled>Slett</Button>
  <Button commandfor="d1" command="show-modal">Åpne</Button>
{/snippet}

{#snippet buttonIcon()}<Button icon aria-label="Søk"><svg></svg></Button>{/snippet}

{#snippet buttonLoading()}
  <Button loading>Laster</Button>
  <Button loading icon aria-label="Laster"><svg></svg></Button>
{/snippet}

{#snippet buttonAsChild()}
  <Button variant="secondary">
    {#snippet child({ props })}<a href="/hjem" {...props}>Til forsiden</a>{/snippet}
  </Button>
{/snippet}

{#snippet spinner()}
  <Spinner aria-label="Henter data" data-size="lg" />
{/snippet}

{#snippet field()}
  <Field position="end">
    <Label weight="regular">Navn</Label>
    <Field.Description>Fornavn og etternavn</Field.Description>
    <Field.Affixes>
      <Field.Affix>kr</Field.Affix>
      <Input value="Ola" />
    </Field.Affixes>
    <Field.Counter limit={10} under="%d igjen" />
    <ValidationMessage>Skriv et navn.</ValidationMessage>
  </Field>
  <Textarea rows={3} value="Hei" />
{/snippet}

{#snippet textfield()}<Textfield label="Prosjektnavn" />{/snippet}

{#snippet textfieldFull()}
  <Textfield
    label="Areal"
    description="Bruttoareal"
    error="Skriv arealet som et tall."
    prefix="ca."
    suffix="m²"
    counter={20}
    data-size="sm"
    class="extra"
    style="max-width: 20rem"
    value="12 400"
    name="areal"
  />
{/snippet}

{#snippet textfieldMultiline()}<Textfield label="Beskrivelse" multiline rows={4} counter={{ limit: 100, over: '%d for mye' }} />{/snippet}

{#snippet inputReadOnly()}<Input type="checkbox" readonly checked /><Input type="radio" name="r" value="a" />{/snippet}
