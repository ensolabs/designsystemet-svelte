<!-- Two Dropdowns in their own Dropdown.TriggerContext, one with its own id, for the interaction tests. -->
<script lang="ts">
  import { Dropdown } from '../../../src/dropdown';

  let { onOpen }: { onOpen?: () => void } = $props();
</script>

<Dropdown.TriggerContext>
  <Dropdown.Trigger>Første</Dropdown.Trigger>
  <Dropdown {onOpen}><Dropdown.List><Dropdown.Item><Dropdown.Button>A</Dropdown.Button></Dropdown.Item></Dropdown.List></Dropdown>
</Dropdown.TriggerContext>
<Dropdown.TriggerContext>
  <Dropdown.Trigger>Andre</Dropdown.Trigger>
  <Dropdown id="egen"><Dropdown.List><Dropdown.Item>B</Dropdown.Item></Dropdown.List></Dropdown>
</Dropdown.TriggerContext>
