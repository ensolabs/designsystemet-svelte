<script lang="ts">
  import { Combobox } from '../../../../src';
  import Places from './Places.svelte';

  let value = $state<string[]>([]);
</script>

<Combobox multiple size="md" label="Hvor går reisen?" bind:value><Places /></Combobox>
