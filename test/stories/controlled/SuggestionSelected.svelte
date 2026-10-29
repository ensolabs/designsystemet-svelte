<!-- A Suggestion controlled by `selected`, with a parent that follows onSelectedChange; the state goes to an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { EXPERIMENTAL_Suggestion as Suggestion } from '../../../src/suggestion';

  type Props = { selected?: any; multiple?: boolean; onSelectedChange?: (value: any) => void };
  let { selected: initial, multiple = false, onSelectedChange }: Props = $props();

  let selected = $state(untrack(() => initial));
</script>

<div class="story">
  <Suggestion
    {multiple}
    {selected}
    onSelectedChange={(value: any) => {
      onSelectedChange?.(value);
      selected = value;
    }}
  >
    <Suggestion.Input aria-label="Kommune" />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Option value="0301">Oslo</Suggestion.Option>
      <Suggestion.Option value="4601">Bergen</Suggestion.Option>
      <Suggestion.Option value="1804">Bodø</Suggestion.Option>
      <Suggestion.Empty>Ingen treff</Suggestion.Empty>
    </Suggestion.List>
  </Suggestion>
</div>
<output>{JSON.stringify(selected ?? null)}</output>
