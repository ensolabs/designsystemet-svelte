<!-- Conditional: the chosen channels as text, and a button that shows the checkbox group to edit them. -->
<script lang="ts">
  import { Button } from '../../../../src';
  import FloppydiskIcon from '../icons/FloppydiskIcon.svelte';
  import PencilIcon from '../icons/PencilIcon.svelte';
  import ContactGroup from './ContactGroup.svelte';

  let value = $state(['epost']);
  let open = $state(false);
</script>

Dine kommunikasjonskanaler: {value.join(', ')}
{#if open}
  <Button onclick={() => (open = false)}><FloppydiskIcon aria-hidden={true} /> Lagre</Button>
  <ContactGroup bind:value />
{:else}
  <Button onclick={() => (open = true)} variant="secondary"><PencilIcon aria-hidden={true} /> Rediger</Button>
{/if}
