<script lang="ts">
  import { Combobox } from '../../../../src';
  import { data } from './places';

  let value = $state<string[]>([]);
</script>

<Combobox virtual size="md" label="Hvor går reisen?" bind:value>
  <Combobox.Empty>Fant ingen treff</Combobox.Empty>
  {#each data as item, index (index)}
    <Combobox.Option value={item.targetName} description={`Orgnr.: ${item.sourceCode}`}>{item.targetName}</Combobox.Option>
  {/each}
</Combobox>
