<!-- useRadioGroup with the given options: three radios, the ValidationMessage, a button that sets the value, and the
     value in an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Button, Fieldset, Radio, ValidationMessage, useRadioGroup, type UseRadioGroupProps } from '../../../src';

  let { options = {} }: { options?: UseRadioGroupProps } = $props();

  const group = useRadioGroup(untrack(() => options));
</script>

<div class="story">
  <Fieldset>
    <Fieldset.Legend>Kanal</Fieldset.Legend>
    <Radio label="E-post" {...group.getRadioProps('epost')} />
    <Radio label="Telefon" {...group.getRadioProps({ value: 'telefon', 'aria-describedby': 'hint' })} />
    <Radio label="SMS" {...group.getRadioProps('sms')} />
    <ValidationMessage {...group.validationMessageProps} />
  </Fieldset>
  <Button class="set" onclick={() => group.setValue('sms')}>SMS</Button>
</div>
<output>{JSON.stringify(group.value)}</output>
