<!-- Kontrollert: a ToggleGroup bound to state, the value shown, and a button that sets it. -->
<script lang="ts">
  import { Button, Divider, Paragraph, ToggleGroup } from '../../../../src';
  import ArchiveIcon from '../icons/ArchiveIcon.svelte';
  import DocPencilIcon from '../icons/DocPencilIcon.svelte';
  import EnvelopeClosedIcon from '../icons/EnvelopeClosedIcon.svelte';
  import PaperplaneIcon from '../icons/PaperplaneIcon.svelte';

  let value = $state('utkast');
</script>

<ToggleGroup aria-label="Filtrering" bind:value>
  <ToggleGroup.Item value="innboks"><EnvelopeClosedIcon aria-hidden={true} />Innboks</ToggleGroup.Item>
  <ToggleGroup.Item value="utkast"><DocPencilIcon aria-hidden={true} />Utkast</ToggleGroup.Item>
  <ToggleGroup.Item value="arkiv"><ArchiveIcon aria-hidden={true} />Arkiv</ToggleGroup.Item>
  <ToggleGroup.Item value="sendt"><PaperplaneIcon aria-hidden={true} />Sendt</ToggleGroup.Item>
</ToggleGroup>
<Divider />
<Paragraph>Du har valgt: {value}</Paragraph>
<Button data-size="sm" onclick={() => (value = 'arkiv')}>Velg Arkiv</Button>
