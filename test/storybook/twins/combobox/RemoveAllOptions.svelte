<script lang="ts">
  import { Combobox, Switch } from '../../../../src';

  let selectedValues = $state<string[]>(['test1', 'test2']);
  let values = $state<string[]>(['test1', 'test2']);

  const changeAllValues = (deleteValues: boolean) => (values = deleteValues ? [] : ['test1', 'test2']);
  const changeSomeValues = (removeTest2: boolean) => (values = removeTest2 ? ['test1'] : ['test1', 'test2']);

  const currentSelectedValues = $derived(selectedValues.filter((id) => values.includes(id)));
</script>

<Combobox label="Hvor går reisen?" multiple value={currentSelectedValues} onValueChange={(next) => (selectedValues = next)}>
  {#each values as attachment (attachment)}
    <Combobox.Option value={attachment} description={attachment} displayValue={attachment} />
  {/each}
</Combobox>
<Switch
  label="Remove Values (Selected values remain unchanged as the combobox does not
          update when options are empty.)"
  onchange={(event) => changeAllValues(event.currentTarget.checked)}
/>
<Switch label="Remove test2 (this works)" onchange={(event) => changeSomeValues(event.currentTarget.checked)} />
