<script lang="ts">
  import { Combobox, Switch } from '../../../../src';
  import { data } from './places';

  let value = $state<string[]>([]);
  let multiple = $state(false);
</script>

<Switch
  label="Multiple"
  checked={multiple}
  onchange={(e) => {
    multiple = e.currentTarget.checked;
    value = [];
  }}
/>
{#key multiple}
  <Combobox size="md" label="Hvor går reisen?" bind:value {multiple}>
    <Combobox.Empty>Fant ingen treff</Combobox.Empty>
    {#each data as item, index (index)}
      <Combobox.Option value={item.targetName} description={`Orgnr.: ${item.sourceCode}`}>{item.targetName}</Combobox.Option>
    {/each}
  </Combobox>
{/key}
