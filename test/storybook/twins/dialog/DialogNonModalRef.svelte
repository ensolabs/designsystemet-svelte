<!-- The DialogNonModalRef story: a Button shows the non-modal Dialog through its element. -->
<script lang="ts">
  import { Button, Dialog, Heading, Paragraph } from '../../../../src';

  let dialog = $state<HTMLDialogElement>();
</script>

<Button onclick={() => dialog?.show()}>Open Dialog</Button>
<Dialog bind:ref={dialog} modal={false}>
  <Heading>Non-modal dialog</Heading>
  <Paragraph>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus sunt
    et.
  </Paragraph>
</Dialog>
