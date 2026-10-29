<!-- The DialogWithForm story: a form in a Dialog, emptied when the Dialog closes. -->
<script lang="ts">
  import { Button, Dialog, Heading, Textfield } from '../../../../src';

  let dialog = $state<HTMLDialogElement>();
  let input = $state('');
</script>

<Dialog.TriggerContext>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog bind:ref={dialog} onClose={() => (input = '')} closedby="any" id="my-dialog">
    <Heading style="margin-bottom: var(--ds-size-2)">Dialog med skjema</Heading>
    <!-- The native autofocus attribute: Dialog focuses the field when it has opened. -->
    <Textfield autofocus label="Navn" bind:value={input} />
    <div style="display: flex; gap: var(--ds-size-4); margin-top: var(--ds-size-4)">
      <Button
        onclick={() => {
          alert(`Du har sendt inn skjema med navn: ${input}`);
          dialog?.close();
        }}
      >
        Send inn skjema
      </Button>
      <Button variant="secondary" command="close" commandfor="my-dialog">Avbryt</Button>
    </div>
  </Dialog>
</Dialog.TriggerContext>
