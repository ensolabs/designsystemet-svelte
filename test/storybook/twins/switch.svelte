<!-- Svelte twins of packages/react/src/components/switch/switch.stories.tsx. -->
<script module lang="ts">
  import { Fieldset, Switch } from '../../../src';

  export { Preview, Checked, Group, RightAligned, Outline };
</script>

{#snippet Preview()}<Switch label="Switch" description="" disabled={false} readonly={false} position="start" />{/snippet}

{#snippet Checked()}<Switch label="Switch" checked />{/snippet}

{#snippet Group()}
  <Fieldset>
    <Fieldset.Legend>Skru av/på lys</Fieldset.Legend>
    <Switch label="Stue" checked />
    <Switch label="Kjøkken" />
    <Switch label="Bad" />
    <Switch label="Soverom" description="Får ikke kontakt med lyspærene" readonly />
  </Fieldset>
{/snippet}

{#snippet RightAligned()}<Switch label="Flymodus" position="end" checked />{/snippet}

{#snippet Outline()}
  <Fieldset>
    <Fieldset.Legend>Using variant="outline"</Fieldset.Legend>
    <Switch variant="outline" label="with description" description="description text" value="description" />
    <Switch variant="outline" label="Checked" value="checked" checked />
    <Switch variant="outline" disabled label="disabled" value="disabled" />
    <Switch variant="outline" readonly label="readonly checked" value="readonly" checked />
  </Fieldset>
{/snippet}
