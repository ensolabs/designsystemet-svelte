<script lang="ts">
  import { Button, Field, Label, Textarea } from '../../../../src';

  let value = $state('Nordmann');
</script>

<Field>
  <Label>Legg til en beskrivelse</Label>
  <Textarea rows={2} bind:value />
  <Field.Counter limit={10} />
</Field>
<Button onclick={() => (value = 'Hei')}>Set verdi "hei"</Button>
