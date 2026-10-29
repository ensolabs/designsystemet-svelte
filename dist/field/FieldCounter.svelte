<!--
  Counts the characters left in the field's input against `limit`. designsystemet-web writes the text from `under`
  ("%d tegn igjen") or `over` ("%d tegn for mye").
-->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ValidationMessage from '../validation-message/ValidationMessage.svelte';

  type Props = Omit<ComponentProps<typeof ValidationMessage>, 'child'> & { limit: number; under?: string; over?: string };

  let { limit, under, over, ...rest }: Props = $props();
</script>

<ValidationMessage data-field="counter" data-limit={limit} data-under={under} data-over={over} {...rest} />
