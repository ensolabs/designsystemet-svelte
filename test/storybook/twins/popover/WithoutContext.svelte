<!--
  The WithoutContext story: a Button with `popovertarget` that toggles `open` itself, and `onClose`, as in React. With
  `bind:open`, the Popover would also set `open` on the trigger's click, and the Button's toggle would undo it.
-->
<script lang="ts">
  import { Button, Paragraph, Popover } from '../../../../src';

  let open = $state(false);
</script>

<Button popovertarget="my-popover" onclick={() => (open = !open)}>My trigger</Button>
<Popover id="my-popover" {open} onClose={() => (open = false)} data-color="neutral">
  <Paragraph>Er du sikker på at du vil slette?</Paragraph>
  <Button data-color="danger" onclick={() => (open = false)} data-size="sm" style="margin-top: var(--ds-size-2)">Slett</Button>
</Popover>
