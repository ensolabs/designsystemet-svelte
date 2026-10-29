<script lang="ts">
  import { Button, Divider, Field, Label, EXPERIMENTAL_Suggestion as Suggestion, type SuggestionItem } from '../../../../src';
  import { DATA_PEOPLE } from './data';

  let item = $state<SuggestionItem | null>(DATA_PEOPLE[0]);
</script>

<Field>
  <Label>Velg person</Label>
  <Suggestion bind:selected={item} filter={false}>
    <Suggestion.Input />
    <Suggestion.Toggle />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Empty />
      {#each DATA_PEOPLE as { label, value } (value)}
        <Suggestion.Option {label} {value}>{label}</Suggestion.Option>
      {/each}
    </Suggestion.List>
  </Suggestion>
</Field>
<Divider style="margin-top: var(--ds-size-4)" />

<div style="margin: var(--ds-size-2) 0">
  Valgt person:
  <pre style="font-size: 14px; height: 100px; white-space: pre-wrap">{JSON.stringify(item)}</pre>
</div>

<Button onclick={() => (item = DATA_PEOPLE[2])}>Sett Nina</Button>
