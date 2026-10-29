<script lang="ts">
  import { Button, Divider, Field, Input, Label, Paragraph } from '../../../../src';

  let value = $state<string>();
</script>

<Field>
  <Label>Kontroller meg!</Label>
  <Input bind:value />
</Field>
<div>
  <Divider />

  <Paragraph style="margin: var(--ds-size-2) 0">
    Du har skrevet inn: {value}
  </Paragraph>
  <Button onclick={() => (value = 'Kake')}>Jeg vil ha Kake</Button>
</div>
