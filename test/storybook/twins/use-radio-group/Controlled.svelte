<!-- Controlled: the pizza group bound to state, the choice shown, and buttons that set it. -->
<script lang="ts">
  import { Button, Divider, Paragraph } from '../../../../src';
  import PizzaGroup from './PizzaGroup.svelte';

  let value = $state('');
</script>

<PizzaGroup bind:value />
<Divider style="margin-top: var(--ds-size-4)" />
<Paragraph style="margin-block: var(--ds-size-2)">Du har valgt: {value}</Paragraph>
<div style="display: flex; gap: 1rem">
  <Button onclick={() => (value = 'flammen')}>Velg Flammen</Button>
  <Button onclick={() => (value = 'snadder')}>Velg Snadder</Button>
</div>
