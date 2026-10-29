<!-- Svelte twins of packages/react/src/components/field/field.stories.tsx. -->
<script module lang="ts">
  import { Divider, Field, Input, Label, Tag, Textarea, ValidationMessage } from '../../../src';
  import CounterControlled_ from './field/CounterControlled.svelte';

  export { Affix, Counter, CounterControlled, Optional, Position, Preview };
</script>

{#snippet Preview()}
  <Field>
    <Label>Etternavn</Label>
    <Field.Description>Etternavn kan ikke inneholde mellomrom</Field.Description>
    <Input value="Nordmann Svenske" />
    <ValidationMessage>Du kan ikke ha mellomrom i etternavnet ditt</ValidationMessage>
  </Field>
{/snippet}

{#snippet Affix()}
  <Field>
    <Label>Hvor mange kroner koster det per måned?</Label>
    <Field.Affixes>
      <Field.Affix>NOK</Field.Affix>
      <Input />
      <Field.Affix>pr. mnd.</Field.Affix>
    </Field.Affixes>
  </Field>
{/snippet}

{#snippet Counter()}
  <Field>
    <Label>Legg til en beskrivelse</Label>
    <Textarea rows={2} />
    <Field.Counter limit={10} />
  </Field>
{/snippet}

{#snippet CounterControlled()}<CounterControlled_ />{/snippet}

{#snippet Position()}
  <div style="max-width: 200px; margin: auto">
    <Field position="end">
      <Label>Flymodus</Label>
      <Input type="checkbox" role="switch" />
    </Field>
    <Divider />
    <Field position="end">
      <Label>Lydløs</Label>
      <Input type="checkbox" role="switch" />
    </Field>
  </div>
{/snippet}

{#snippet Optional()}
  <Field>
    <Label>
      Hvor bor du?
      <Tag data-color="info" style="margin-inline-start: var(--ds-size-2)">Valgfritt</Tag>
    </Label>
    <Input />
  </Field>
{/snippet}
