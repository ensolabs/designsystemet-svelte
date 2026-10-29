<script lang="ts">
  import { Button, Divider, Field, Label, Paragraph, EXPERIMENTAL_Suggestion as Suggestion, type SuggestionItem } from '../../../../src';
  import { DATA_PLACES } from './data';

  let { creatable }: { creatable?: boolean } = $props();
  let selected = $state<string | undefined>('');
</script>

<Field>
  <Label>Velg destinasjon</Label>
  <Suggestion {creatable} selected={selected} onSelectedChange={(item: SuggestionItem | null) => (selected = item?.value)}>
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
  Valgte reisemål: {selected}
</Paragraph>

<Button onclick={() => (selected = 'Sogndal')}>Sett reisemål til Sogndal</Button>
