<script lang="ts">
  import { Combobox, Divider, Paragraph } from '../../../../src';
  import { PLACES } from './places';

  let value = $state<string[]>(['all']);

  // As the story's handler, which sees `value` from before the change.
  const handleValueChange = (newVal: string[]) => {
    const previous = value;
    let next = newVal;

    // if we have all, and we select something else, remove all
    if (newVal.includes('all') && newVal.length > 1) next = newVal.filter((v) => v !== 'all');

    // if we click all, deselect all other options
    if (newVal.includes('all') && !previous.includes('all')) next = ['all'];

    value = next;
  };
</script>

<Combobox {value} initialValue={['all']} multiple onValueChange={handleValueChange} label="Hvor går reisen?">
  <Combobox.Empty>Fant ingen treff</Combobox.Empty>
  <Combobox.Option value="all">Alle kommuner</Combobox.Option>
  {#each PLACES as item, index (index)}
    <Combobox.Option value={item.value}>{item.name}</Combobox.Option>
  {/each}
</Combobox>

<Divider />

<Paragraph>Value er: {value.join(', ')}</Paragraph>
