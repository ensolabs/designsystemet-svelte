<!-- Combobox.Empty and an option per place, as most of the stories have them. -->
<script lang="ts">
  import { Combobox } from '../../../../src';
  import { PLACES } from './places';
</script>

<Combobox.Empty>Fant ingen treff</Combobox.Empty>
{#each PLACES as item, index (index)}
  <Combobox.Option value={item.value}>{item.name}</Combobox.Option>
{/each}
