<!-- The contact-channel checkbox group most Checkbox stories (and useCheckboxGroup's Default) render with
     useCheckboxGroup: a Fieldset of checkboxes bound to one array, the shared name, disabled and readonly passed to each,
     and a ValidationMessage that holds the group's error. -->
<script lang="ts">
  import { Checkbox, Fieldset, ValidationMessage } from '../../../../src';

  type Props = {
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    position?: 'end';
    legend?: boolean;
    value?: string[];
  };
  let { name, disabled, readonly, error, position, legend = true, value = $bindable(['epost']) }: Props = $props();

  const uid = $props.id();
  const errorId = `${uid}-error`;
  const choices = [
    ['epost', 'E-post'],
    ['telefon', 'Telefon'],
    ['sms', 'SMS'],
  ];
</script>

<Fieldset>
  {#if legend}
    <Fieldset.Legend>Hvordan vil du helst at vi skal kontakte deg?</Fieldset.Legend>
    <Fieldset.Description>Velg alle alternativene som er relevante for deg.</Fieldset.Description>
  {/if}
  {#each choices as [choice, label] (choice)}
    <Checkbox
      {label}
      {position}
      name={name ?? uid}
      value={choice}
      bind:group={value}
      {disabled}
      {readonly}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    />
  {/each}
  <ValidationMessage id={errorId} hidden={!error}>{error}</ValidationMessage>
</Fieldset>
