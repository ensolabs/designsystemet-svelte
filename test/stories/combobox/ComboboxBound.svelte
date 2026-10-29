<!-- A Combobox of places with `bind:value`, showing the bound value in an `output` next to it. -->
<script lang="ts">
  import { Combobox } from '../../../src/combobox';

  // Loosely typed: the tests pass any Combobox props.
  type Props = { value?: string[]; [prop: string]: any };

  let { value = $bindable(), ...rest }: Props = $props();

  const places = [
    { name: 'Oslo', value: '0301' },
    { name: 'Bergen', value: '4601' },
    { name: 'Bodø', value: '1804' },
    { name: 'Brønnøysund', value: '1813' },
  ];
</script>

<div class="story">
  <Combobox label="Kommune" bind:value {...rest}>
    <Combobox.Empty>Ingen treff</Combobox.Empty>
    {#each places as place (place.value)}
      <Combobox.Option value={place.value}>{place.name}</Combobox.Option>
    {/each}
  </Combobox>
</div>
<output>{JSON.stringify(value ?? null)}</output>
