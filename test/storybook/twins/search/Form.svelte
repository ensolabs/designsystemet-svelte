<script lang="ts">
  import { Paragraph, Search } from '../../../../src';

  let value = $state<string>();
  let submittedValue = $state<string>();
</script>

<form
  onsubmit={(event) => {
    // Prevent navigation from Storybook
    event.preventDefault();
    submittedValue = value;
  }}
>
  <Search>
    <Search.Input type="text" aria-label="Søk" bind:value />
    <Search.Clear />
    <Search.Button />
  </Search>
</form>

<Paragraph data-size="md" style="margin-top: var(--ds-size-2)">
  Submitted value: {submittedValue}
</Paragraph>
