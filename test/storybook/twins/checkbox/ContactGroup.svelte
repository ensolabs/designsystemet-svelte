<!-- The contact-channel checkbox group most Checkbox stories (and useCheckboxGroup's Default) render with
     useCheckboxGroup({ value: ['epost'], ...args }): a Fieldset of checkboxes from getCheckboxProps, and a
     ValidationMessage from validationMessageProps. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Checkbox, Fieldset, ValidationMessage, useCheckboxGroup, type UseCheckboxGroupProps } from '../../../../src';

  type Props = { args?: Record<string, unknown>; legend?: boolean; position?: 'end' };
  let { args = {}, legend = true, position }: Props = $props();

  const { getCheckboxProps, validationMessageProps } = useCheckboxGroup(untrack(() => ({ value: ['epost'], ...args }) as UseCheckboxGroupProps));
</script>

<Fieldset>
  {#if legend}
    <Fieldset.Legend>Hvordan vil du helst at vi skal kontakte deg?</Fieldset.Legend>
    <Fieldset.Description>Velg alle alternativene som er relevante for deg.</Fieldset.Description>
  {/if}
  <Checkbox {...getCheckboxProps('epost')} {position} label="E-post" />
  <Checkbox {...getCheckboxProps('telefon')} {position} label="Telefon" />
  <Checkbox {...getCheckboxProps('sms')} {position} label="SMS" />
  <ValidationMessage {...validationMessageProps} />
</Fieldset>
