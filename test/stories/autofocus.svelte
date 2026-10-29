<!-- autofocus written as a string, as React writes a lower-case `autofocus` (Digdir's DialogWithForm story). -->
<script module lang="ts">
  import { Input, Textarea, Textfield } from '../../src';

  export { autofocusString };
</script>

{#snippet autofocusString()}
  <Input autofocus="true" aria-label="Input" />
  <Textarea autofocus="true" aria-label="Textarea" />
  <Textfield autofocus="" label="Textfield" />
  <Textfield multiline autofocus="true" label="Textfield multiline" />
{/snippet}
