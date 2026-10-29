<script lang="ts">
  import { Field, Label, EXPERIMENTAL_Suggestion as Suggestion, type SuggestionItem } from '../../../../src';
  import { DATA_PLACES } from './data';

  let selected = $state<string | undefined>('Sogndal');
</script>

<Field>
  <Label>Viser alle options også når valgt</Label>
  <Suggestion {selected} filter={false} onSelectedChange={(item: SuggestionItem | null) => (selected = item?.value)}>
    <Suggestion.Input />
    <Suggestion.Toggle />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Empty />
      {#each DATA_PLACES as place (place)}
        <Suggestion.Option>{place}</Suggestion.Option>
      {/each}
    </Suggestion.List>
  </Suggestion>
</Field>
