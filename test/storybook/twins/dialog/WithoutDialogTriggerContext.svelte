<!-- The WithoutDialogTriggerContext story: a Button opens the Dialog through its element. -->
<script lang="ts">
  import { Button, Dialog, Heading, Paragraph } from '../../../../src';

  let dialog = $state<HTMLDialogElement>();
</script>

<Button onclick={() => dialog?.showModal()}>Open Dialog with ref</Button>
<Dialog bind:ref={dialog}>
  <Paragraph data-size="sm">Dialog subtittel</Paragraph>
  <Heading style="margin-bottom: var(--ds-size-2)">Dialog header</Heading>
  <Paragraph style="margin-bottom: var(--ds-size-2)">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus sunt
    et.
  </Paragraph>
  Dialog footer
</Dialog>
