<script lang="ts">
  import { Button, Divider, Field, Label, Paragraph, EXPERIMENTAL_Suggestion as Suggestion } from '../../../../src';
  import { DATA_PLACES } from './data';

  let selected = $state<string[]>(['Oslo']);
</script>

<Field>
  <Label>Velg destinasjoner</Label>
  <Suggestion multiple {selected} onSelectedChange={(items) => (selected = items.map((item) => item.value))}>
    <Suggestion.Input />
    <Suggestion.Toggle />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Empty />
      {#each DATA_PLACES as place (place)}
        <Suggestion.Option label={place} value={place}>
          {place}
          <div>Kommune</div>
        </Suggestion.Option>
      {/each}
    </Suggestion.List>
  </Suggestion>
</Field>
<Divider style="margin-top: var(--ds-size-4)" />

<Paragraph style="margin: var(--ds-size-2) 0">
  Valgte reisemål: {selected.join(', ')}
</Paragraph>

<Button onclick={() => (selected = ['Sogndal', 'Stavanger'])}>Sett reisemål til Sogndal, Stavanger</Button>
