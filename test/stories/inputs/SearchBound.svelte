<!-- A Search with `bind:value`, showing the bound value in an `output` next to it. -->
<script lang="ts">
  import { Search } from '../../../src/search';

  let { value = $bindable('') }: { value?: string } = $props();
</script>

<div class="story">
  <Search>
    <Search.Input aria-label="Søk" bind:value />
    <Search.Clear />
    <Search.Button />
  </Search>
</div>
<output>{JSON.stringify(value)}</output>
