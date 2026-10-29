<!-- A Dialog for the controlled-state tests: uncontrolled, controlled by `open` (with a parent that follows onClose or
     not), or bound with bind:open; with a Dialog.Trigger and buttons outside that set the parent's `open`. The state
     goes to an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Dialog } from '../../../src/dialog';

  type Props = { open?: boolean; modal?: boolean; follow?: boolean; bind?: boolean; onClose?: (event: Event) => void };
  let { open: initial, modal: initialModal = true, follow = false, bind = false, onClose }: Props = $props();

  let open = $state(untrack(() => initial));
  let modal = $state(untrack(() => initialModal));
</script>

<div class="story">
  <button id="set-open" onclick={() => (open = true)}>Sett åpen</button>
  <button id="set-closed" onclick={() => (open = false)}>Sett lukket</button>
  <button id="toggle-modal" onclick={() => (modal = !modal)}>Modal</button>
  <Dialog.TriggerContext>
    <Dialog.Trigger>Åpne</Dialog.Trigger>
    {#if bind}
      <Dialog bind:open {modal} {onClose}>Innhold</Dialog>
    {:else}
      <Dialog
        {open}
        {modal}
        onClose={(event) => {
          onClose?.(event);
          if (follow) open = false;
        }}>Innhold</Dialog
      >
    {/if}
  </Dialog.TriggerContext>
</div>
<output>{JSON.stringify(open ?? null)}</output>
