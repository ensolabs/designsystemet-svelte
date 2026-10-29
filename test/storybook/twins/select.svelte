<!-- Svelte twins of packages/react/src/components/select/select.stories.tsx. -->
<script module lang="ts">
  import { Field, Label, Select, ValidationMessage } from '../../../src';

  export { Preview, Disabled, ReadOnly, WithError, WithOptgroup };

  const mountains = [
    ['everest', 'Mount Everest'],
    ['aconcagua', 'Aconcagua'],
    ['denali', 'Denali'],
    ['kilimanjaro', 'Kilimanjaro'],
    ['elbrus', 'Elbrus'],
    ['vinson', 'Mount Vinson'],
    ['puncakjaya', 'Puncak Jaya'],
    ['kosciuszko', 'Mount Kosciuszko'],
  ];
  const parks = [
    { label: 'Grünerløkka', options: [['sofienbergparken', 'Sofienbergparken'], ['birkelunden', 'Birkelunden'], ['olafryesplass', 'Olaf Ryes plass']] },
    { label: 'Sentrum', options: [['slottsparken', 'Slottsparken'], ['studenterlunden', 'Studenterlunden']] },
    { label: 'Gamle Oslo', options: [['botsparken', 'Botsparken'], ['klosterenga', 'Klosterenga park']] },
  ];
</script>

{#snippet mountainOptions()}
  {#each mountains as [value, name] (value)}<Select.Option {value}>{name}</Select.Option>{/each}
{/snippet}

{#snippet Preview()}
  <Field>
    <Label>Velg et fjell</Label>
    <Select aria-invalid={false} width="full" disabled={false} readonly={false} value="">
      <Select.Option value="" disabled>Velg et fjell &hellip;</Select.Option>
      {@render mountainOptions()}
    </Select>
  </Field>
{/snippet}

{#snippet Disabled()}
  <Field>
    <Label>Velg et fjell</Label>
    <Select disabled>
      <Select.Option value="blank">Velg &hellip;</Select.Option>
      {@render mountainOptions()}
    </Select>
  </Field>
{/snippet}

{#snippet ReadOnly()}
  <Field>
    <Label>Kommune</Label>
    <Select aria-readonly={true} value="sogndal">
      <Select.Option value="blank">Velg &hellip;</Select.Option>
      <Select.Option value="sogndal">Sogndal</Select.Option>
    </Select>
  </Field>
{/snippet}

{#snippet WithError()}
  <Field>
    <Label>Velg et fjell</Label>
    <Select aria-invalid={true}>
      <Select.Option value="blank">Velg &hellip;</Select.Option>
      {@render mountainOptions()}
    </Select>
    <ValidationMessage>Velg et fjell</ValidationMessage>
  </Field>
{/snippet}

{#snippet WithOptgroup()}
  <Field>
    <Label>Velg en park</Label>
    <Select>
      {#each parks as { label, options } (label)}
        <Select.Optgroup {label}>
          {#each options as [value, name] (value)}<Select.Option {value}>{name}</Select.Option>{/each}
        </Select.Optgroup>
      {/each}
    </Select>
  </Field>
{/snippet}
