<script lang="ts">
  import { Combobox, Dialog, Heading } from '../../../../src';
  import Places from './Places.svelte';

  let value = $state<string[]>([]);
</script>

<Dialog.TriggerContext>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog style="overflow: visible">
    <Heading data-size="xs" style="margin-bottom: var(--ds-size-2)">Combobox i Dialog</Heading>
    <Combobox bind:value multiple label="Hvor går reisen?" portal={false} name="sted"><Places /></Combobox>
  </Dialog>
</Dialog.TriggerContext>
