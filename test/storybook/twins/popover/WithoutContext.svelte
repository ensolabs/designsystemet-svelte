<!-- The WithoutContext story: a Button with `popovertarget` and the Popover's bound `open`. -->
<script lang="ts">
  import { Button, Paragraph, Popover } from '../../../../src';

  let open = $state(false);
</script>

<Button popovertarget="my-popover" onclick={() => (open = !open)}>My trigger</Button>
<Popover id="my-popover" bind:open data-color="neutral">
  <Paragraph>Er du sikker på at du vil slette?</Paragraph>
  <Button data-color="danger" onclick={() => (open = false)} data-size="sm" style="margin-top: var(--ds-size-2)">Slett</Button>
</Popover>
