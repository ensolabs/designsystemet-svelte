<!-- Conditional: the chosen channel as text, and a button that shows the radio group to change it. -->
<script lang="ts">
  import { Button, Fieldset, Radio, ValidationMessage } from '../../../../src';
  import FloppydiskIcon from '../icons/FloppydiskIcon.svelte';
  import PencilIcon from '../icons/PencilIcon.svelte';

  let value = $state('');
  let open = $state(false);
  const uid = $props.id();
  const choices = [
    ['epost', 'E-post'],
    ['telefon', 'Telefon'],
    ['sms', 'SMS'],
  ];
</script>

Din kommunikasjonskanal: {value}
{#if open}
  <Button onclick={() => (open = false)}><FloppydiskIcon aria-hidden={true} /> Lagre</Button>
  <Fieldset>
    <Fieldset.Legend>Hvordan vil du helst at vi skal kontakte deg?</Fieldset.Legend>
    <Fieldset.Description>Velg alle alternativene som er relevante for deg.</Fieldset.Description>
    {#each choices as [choice, label] (choice)}
      <Radio {label} name="kommunikasjonskanal" value={choice} bind:group={value} />
    {/each}
    <ValidationMessage id="{uid}-error" hidden />
  </Fieldset>
{:else}
  <Button onclick={() => (open = true)} variant="secondary"><PencilIcon aria-hidden={true} /> Rediger</Button>
{/if}
