<!-- The DialogWithOpenProp story: a Button toggles the Dialog's bound `open`. -->
<script lang="ts">
  import { Button, Dialog, Heading, Paragraph } from '../../../../src';

  let open = $state(false);
</script>

<Button onclick={() => (open = !open)}>Open Dialog with prop</Button>
<Dialog bind:open>
  <Paragraph data-size="sm">Dialog subtittel</Paragraph>
  <Heading style="margin-bottom: var(--ds-size-2)">Dialog header</Heading>
  <Paragraph style="margin-bottom: var(--ds-size-2)">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus sunt
    et.
  </Paragraph>
  Dialog footer
</Dialog>
