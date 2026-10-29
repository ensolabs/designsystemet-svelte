<script lang="ts">
  import { Field, Label, EXPERIMENTAL_Suggestion as Suggestion } from '../../../../src';
  import { DATA_PLACES } from './data';

  let selected = $state('');
</script>

<Field>
  <Label>Skriv inn et tall mellom 1-6</Label>
  <Suggestion filter={false}>
    <Suggestion.Input oninput={({ currentTarget }) => (selected = currentTarget.value)} />
    <Suggestion.Toggle />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Empty />
      {#each DATA_PLACES.filter((_, index) => !selected || index === Number(selected) - 1) as label (label)}
        <Suggestion.Option>{label}</Suggestion.Option>
      {/each}
    </Suggestion.List>
  </Suggestion>
</Field>
