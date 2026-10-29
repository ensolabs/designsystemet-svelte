<!-- A Suggestion whose parent changes one of its attributes (`data-count`) with a button, leaving the options alone. -->
<script lang="ts">
  import { EXPERIMENTAL_Suggestion as Suggestion } from '../../../src/suggestion';

  let count = $state(0);
</script>

<div class="story">
  <Suggestion data-count={count}>
    <Suggestion.Input aria-label="Kommune" />
    <Suggestion.List>
      <Suggestion.Option value="0301">Oslo</Suggestion.Option>
      <Suggestion.Option value="4601">Bergen</Suggestion.Option>
      <Suggestion.Option value="1804">Bodø</Suggestion.Option>
      <Suggestion.Empty>Ingen treff</Suggestion.Empty>
    </Suggestion.List>
  </Suggestion>
  <button type="button" class="rerender" onclick={() => count++}>Oppdater</button>
</div>
