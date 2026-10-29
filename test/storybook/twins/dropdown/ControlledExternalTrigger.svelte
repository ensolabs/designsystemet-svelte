<!-- The ControlledExternalTrigger story: a Button with `popovertarget` and the Dropdown's bound `open`. -->
<script lang="ts">
  import { Button, Dropdown } from '../../../../src';

  let open = $state(false);
</script>

<Button popovertarget="dropdown">Dropdown</Button>
<Dropdown id="dropdown" bind:open>
  <Dropdown.List>
    <Dropdown.Item>
      <Dropdown.Button>Item</Dropdown.Button>
    </Dropdown.Item>
  </Dropdown.List>
</Dropdown>
