<script lang="ts">
  import { Button, Divider, Label, Paragraph, Textarea } from '../../../../src';

  let value = $state('');
</script>

<Label for="my-textarea">Kontroller meg!</Label>
<Textarea cols={40} bind:value id="my-textarea" />

<Divider style="margin-top: var(--ds-size-4)" />

<Paragraph style="margin: var(--ds-size-2) 0">
  Du har skrevet inn: {value}
</Paragraph>
<Button onclick={() => (value = 'Pizza')}>Jeg vil ha Pizza</Button>
