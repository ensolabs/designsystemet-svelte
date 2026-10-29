<script lang="ts">
  import { Button, Combobox, Divider } from '../../../../src';
  import { PLACES } from './places';

  let value = $state<string[]>([]);
  let options = $state<typeof PLACES>([]);
  let loading = $state(true);

  const fetchOptions = () => {
    if (!loading) return;
    setTimeout(() => {
      options = PLACES;
      loading = false;
    }, 2000);
  };
</script>

<Combobox size="md" label="Hvor går reisen?" bind:value onfocus={fetchOptions} {loading}>
  <Combobox.Empty>Fant ingen treff</Combobox.Empty>
  {#each options as item, index (index)}
    <Combobox.Option value={item.value}>{item.name}</Combobox.Option>
  {/each}
</Combobox>

<Divider />

<Button
  onclick={() => {
    loading = true;
    options = [];
    value = [];
  }}
>
  Clear Data
</Button>
