<!-- A Dialog with bound `open` and a Dialog.Trigger, for the interaction tests. -->
<script lang="ts">
  import { Dialog } from '../../../src/dialog';

  let { open = $bindable(), modal = true, onClose }: { open?: boolean; modal?: boolean; onClose?: (event: Event) => void } = $props();

  export const getOpen = () => open;
  export const setOpen = (value: boolean | undefined) => (open = value);
</script>

<Dialog.TriggerContext>
  <Dialog.Trigger>Åpne</Dialog.Trigger>
  <Dialog bind:open {modal} {onClose}>Innhold</Dialog>
</Dialog.TriggerContext>
