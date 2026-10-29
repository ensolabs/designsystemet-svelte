import { Button, Field, Input, Label, Spinner, Textarea, Textfield, ValidationMessage } from '@digdir/designsystemet-react';
import type { ReactElement } from 'react';
import type { Snippet } from 'svelte';
import { expect, test } from 'vitest';
import { both } from './parity';
import * as S from './stories/form.svelte';

const stories: Record<Exclude<keyof typeof S, 'default'>, ReactElement> = {
  buttonPrimary: <Button>Lagre</Button>,
  buttonVariants: (
    <>
      <Button variant="secondary" data-size="sm">Avbryt</Button>
      <Button variant="tertiary" data-color="danger" type="submit" disabled>Slett</Button>
      <Button commandfor="d1" command="show-modal">Åpne</Button>
    </>
  ),
  buttonIcon: <Button icon aria-label="Søk"><svg /></Button>,
  buttonLoading: (
    <>
      <Button loading>Laster</Button>
      <Button loading icon aria-label="Laster"><svg /></Button>
    </>
  ),
  buttonAsChild: (
    <Button variant="secondary" asChild>
      <a href="/hjem">Til forsiden</a>
    </Button>
  ),
  spinner: <Spinner aria-label="Henter data" data-size="lg" />,
  field: (
    <>
      <Field position="end">
        <Label weight="regular">Navn</Label>
        <Field.Description>Fornavn og etternavn</Field.Description>
        <Field.Affixes>
          <Field.Affix>kr</Field.Affix>
          <Input defaultValue="Ola" />
        </Field.Affixes>
        <Field.Counter limit={10} under="%d igjen" />
        <ValidationMessage>Skriv et navn.</ValidationMessage>
      </Field>
      <Textarea rows={3} defaultValue="Hei" />
    </>
  ),
  textfield: <Textfield label="Prosjektnavn" />,
  textfieldFull: (
    <Textfield
      label="Areal"
      description="Bruttoareal"
      error="Skriv arealet som et tall."
      prefix="ca."
      suffix="m²"
      counter={20}
      data-size="sm"
      className="extra"
      style={{ maxWidth: '20rem' }}
      defaultValue="12 400"
      name="areal"
    />
  ),
  textfieldMultiline: <Textfield label="Beskrivelse" multiline rows={4} counter={{ limit: 100, over: '%d for mye' }} />,
  inputReadOnly: (
    <>
      <Input type="checkbox" readOnly defaultChecked />
      <Input type="radio" name="r" value="a" />
    </>
  ),
};

for (const [name, react] of Object.entries(stories)) {
  test(name, async () => {
    const out = await both(react, (S as unknown as Record<string, Snippet>)[name]);
    expect(out.svelte).toBe(out.react);
  });
}
