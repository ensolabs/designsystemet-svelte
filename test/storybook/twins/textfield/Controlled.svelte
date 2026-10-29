<script lang="ts">
  import { Button, Divider, Paragraph, Textfield } from '../../../../src';

  let value = $state('Ost');
</script>

<Textfield label="Kontroller meg!" bind:value counter={5} />

<Divider style="margin-top: var(--ds-size-4)" />

<Paragraph style="margin: var(--ds-size-2) 0">
  Du har skrevet inn: {value}
</Paragraph>
<Button onclick={() => (value = 'Kake')}>Jeg vil ha Kake</Button>
