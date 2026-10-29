<!-- Conditional: the chosen channel as text, and a button that shows the radio group to change it. The group's state
     lives in useRadioGroup, above the fieldset that comes and goes. -->
<script lang="ts">
  import { Button, Fieldset, Radio, ValidationMessage, useRadioGroup } from '../../../../src';
  import FloppydiskIcon from '../icons/FloppydiskIcon.svelte';
  import PencilIcon from '../icons/PencilIcon.svelte';

  const group = useRadioGroup({ name: 'kommunikasjonskanal' });
  let open = $state(false);
</script>

Din kommunikasjonskanal: {group.value}
{#if open}
  <Button onclick={() => (open = false)}><FloppydiskIcon aria-hidden={true} /> Lagre</Button>
  <Fieldset>
    <Fieldset.Legend>Hvordan vil du helst at vi skal kontakte deg?</Fieldset.Legend>
    <Fieldset.Description>Velg alle alternativene som er relevante for deg.</Fieldset.Description>
    <Radio label="E-post" {...group.getRadioProps('epost')} />
    <Radio label="Telefon" {...group.getRadioProps('telefon')} />
    <Radio label="SMS" {...group.getRadioProps('sms')} />
    <ValidationMessage {...group.validationMessageProps} />
  </Fieldset>
{:else}
  <Button onclick={() => (open = true)} variant="secondary"><PencilIcon aria-hidden={true} /> Rediger</Button>
{/if}
