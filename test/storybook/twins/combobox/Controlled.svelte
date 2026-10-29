<script lang="ts">
  import { Button, Combobox, Divider, Paragraph, Switch } from '../../../../src';
  import { PLACES } from './places';

  let value = $state<string[]>([]);
  let multiple = $state(false);
</script>

{#key multiple}
  <Combobox label="Hvor går reisen?" bind:value {multiple}>
    <Combobox.Empty>Fant ingen treff</Combobox.Empty>
    {#each PLACES as item (item.value)}
      <Combobox.Option value={item.value}>{item.name}</Combobox.Option>
    {/each}
  </Combobox>
{/key}

<Divider style="margin-top: var(--ds-size-4)" />

<Switch
  label="Multiple"
  checked={multiple}
  onchange={(e) => {
    multiple = e.currentTarget.checked;
    value = [];
  }}
/>

<Paragraph style="margin: var(--ds-size-2) 0">
  Value er: {value.join(', ')}
</Paragraph>
<Button onclick={() => (value = ['leikanger'])}>Sett verdi til Leikanger</Button>
