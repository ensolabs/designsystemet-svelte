<!-- A Popover with bound `open`, a trigger and something outside it, for the interaction tests. -->
<script lang="ts">
  import { Popover } from '../../../src/popover';

  let { open = $bindable(), onOpen, onClose }: { open?: boolean; onOpen?: () => void; onClose?: () => void } = $props();

  export const getOpen = () => open;
  export const setOpen = (value: boolean | undefined) => (open = value);
</script>

<Popover.TriggerContext>
  <Popover.Trigger>Åpne</Popover.Trigger>
  <Popover bind:open {onOpen} {onClose}><button>Inni</button></Popover>
</Popover.TriggerContext>
<p>Utenfor</p>
