<!-- The Controlled story: the Popover's bound `open`, closed by its buttons. -->
<script lang="ts">
  import { Button, Paragraph, Popover } from '../../../../src';

  let open = $state(false);
</script>

<Popover.TriggerContext>
  <Popover.Trigger>Slett</Popover.Trigger>
  <Popover bind:open data-color="neutral">
    <Paragraph>Er du sikker på at du vil slette?</Paragraph>
    <div style="display: flex; gap: var(--ds-size-2); margin-top: var(--ds-size-2)">
      <Button data-color="danger" onclick={() => (open = false)} data-size="sm">Slett</Button>
      <Button data-variant="tertiary" data-color="danger" onclick={() => (open = false)} data-size="sm">Avbryt</Button>
    </div>
  </Popover>
</Popover.TriggerContext>
