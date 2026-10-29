<!-- The Controlled story: the Dropdown's bound `open`, shown on the trigger and closed by the buttons. -->
<script lang="ts">
  import { Dropdown } from '../../../../src';
  import ChevronDownIcon from '../icons/ChevronDownIcon.svelte';
  import ChevronUpIcon from '../icons/ChevronUpIcon.svelte';

  let open = $state(false);
</script>

<Dropdown.TriggerContext>
  <Dropdown.Trigger>
    Dropdown
    {#if open}<ChevronDownIcon aria-hidden />{:else}<ChevronUpIcon aria-hidden />{/if}
  </Dropdown.Trigger>
  <Dropdown bind:open>
    <Dropdown.List>
      <Dropdown.Item>
        <Dropdown.Button onclick={() => (open = false)}>Trykk på meg lukker</Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button onclick={() => (open = false)}>Eg lukker også</Dropdown.Button>
      </Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
</Dropdown.TriggerContext>
