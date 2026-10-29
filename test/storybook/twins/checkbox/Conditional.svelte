<!-- Conditional: the chosen channels as text, and a button that shows the checkbox group to edit them. The group's
     state lives in useCheckboxGroup, above the fieldset that comes and goes. -->
<script lang="ts">
  import { Button, Checkbox, Fieldset, ValidationMessage, useCheckboxGroup } from '../../../../src';
  import FloppydiskIcon from '../icons/FloppydiskIcon.svelte';
  import PencilIcon from '../icons/PencilIcon.svelte';

  const group = useCheckboxGroup({ value: ['epost'], label: '' } as Parameters<typeof useCheckboxGroup>[0]);
  let open = $state(false);
</script>

Dine kommunikasjonskanaler: {group.value.join(', ')}
{#if open}
  <Button onclick={() => (open = false)}><FloppydiskIcon aria-hidden={true} /> Lagre</Button>
  <Fieldset>
    <Fieldset.Legend>Hvordan vil du helst at vi skal kontakte deg?</Fieldset.Legend>
    <Fieldset.Description>Velg alle alternativene som er relevante for deg.</Fieldset.Description>
    <Checkbox {...group.getCheckboxProps('epost')} label="E-post" />
    <Checkbox {...group.getCheckboxProps('telefon')} label="Telefon" />
    <Checkbox {...group.getCheckboxProps('sms')} label="SMS" />
    <ValidationMessage {...group.validationMessageProps} />
  </Fieldset>
{:else}
  <Button onclick={() => (open = true)} variant="secondary"><PencilIcon aria-hidden={true} /> Rediger</Button>
{/if}
