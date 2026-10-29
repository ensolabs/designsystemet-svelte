<!-- Tabs with bound `value`, or uncontrolled with `defaultValue`, for the interaction tests. -->
<script lang="ts">
  import { Tabs } from '../../../src/tabs';

  let { value = $bindable(), defaultValue, onChange }: { value?: string; defaultValue?: string; onChange?: (value: string) => void } = $props();

  export const getValue = () => value;
  export const setValue = (next: string | undefined) => (value = next);
</script>

<Tabs bind:value {defaultValue} {onChange}>
  <Tabs.List>
    <Tabs.Tab value="1">En</Tabs.Tab>
    <Tabs.Tab value="2">To</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="1">1</Tabs.Panel>
  <Tabs.Panel value="2">2</Tabs.Panel>
</Tabs>
