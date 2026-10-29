<!-- A Suggestion with `bind:selected`, showing the bound value in an `output` next to it. Empty comes last, as
     designsystemet-web gives it the typed text as its label and the first option with that label is matched. -->
<script lang="ts">
  import { EXPERIMENTAL_Suggestion as Suggestion } from '../../../src/suggestion';

  // Loosely typed: the tests pass single and multiple props alike.
  type Props = { selected?: any; options?: { label: string; value: string }[]; [prop: string]: any };

  let {
    selected = $bindable(),
    options = [
      { label: 'Oslo', value: '0301' },
      { label: 'Bergen', value: '4601' },
      { label: 'Bodø', value: '1804' },
    ],
    ...rest
  }: Props = $props();
</script>

<div class="story">
  <Suggestion bind:selected {...rest}>
    <Suggestion.Input aria-label="Kommune" />
    <Suggestion.Clear />
    <Suggestion.List>
      {#each options as option (option.value)}
        <Suggestion.Option value={option.value}>{option.label}</Suggestion.Option>
      {/each}
      <Suggestion.Empty>Ingen treff</Suggestion.Empty>
    </Suggestion.List>
  </Suggestion>
</div>
<output>{JSON.stringify(selected ?? null)}</output>
