<!-- useCheckboxGroup with the given options: three checkboxes, a "select all", the ValidationMessage, a button that
     sets the value, and the value in an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Button, Checkbox, Fieldset, ValidationMessage, useCheckboxGroup, type UseCheckboxGroupProps } from '../../../src';

  let { options = {} }: { options?: UseCheckboxGroupProps } = $props();

  const group = useCheckboxGroup(untrack(() => options));
</script>

<div class="story">
  <Fieldset>
    <Fieldset.Legend>Kanaler</Fieldset.Legend>
    <Checkbox aria-label="Alle" {...group.getCheckboxProps({ value: 'all', allowIndeterminate: true })} />
    <Checkbox label="E-post" {...group.getCheckboxProps('epost')} />
    <Checkbox label="Telefon" {...group.getCheckboxProps({ value: 'telefon', 'aria-describedby': 'hint' })} />
    <Checkbox label="SMS" {...group.getCheckboxProps('sms')} />
    <ValidationMessage {...group.validationMessageProps} />
  </Fieldset>
  <Button class="set" onclick={() => group.setValue(['sms'])}>SMS</Button>
</div>
<output>{JSON.stringify(group.value)}</output>
