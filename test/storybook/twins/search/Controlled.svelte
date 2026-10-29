<script lang="ts">
  import { Button, Divider, Paragraph, Search } from '../../../../src';

  let value = $state('');
</script>

<Search>
  <Search.Input type="text" aria-label="Søk" bind:value />
  <Search.Clear />
  <Search.Button />
</Search>

<Divider style="margin-top: var(--ds-size-4)" />

<Paragraph style="margin: var(--ds-size-2) 0">
  Du har skrevet inn: {value}
</Paragraph>
<Button onclick={() => (value = 'Pizza')}>Jeg vil ha Pizza</Button>
