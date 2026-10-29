<script lang="ts">
  import { Chip, Combobox, Divider, Paragraph } from '../../../../src';
  import Places from './Places.svelte';

  let value = $state<string[]>([]);
</script>

<div style="margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: var(--ds-size-2)">
  {#each value as item, index (index)}
    <Chip.Removable onclick={() => (value = value.filter((v) => v !== item))}>{item}</Chip.Removable>
  {/each}
</div>

<Combobox bind:value multiple label="Hvor går reisen?" hideChips><Places /></Combobox>

<Divider />

<Paragraph>Value er: {value.join(', ')}</Paragraph>
