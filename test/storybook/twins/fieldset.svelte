<!-- Svelte twins of packages/react/src/components/fieldset/fieldset.stories.tsx. -->
<script module lang="ts">
  import { Checkbox, Fieldset, Radio } from '../../../src';

  export { Preview, WithCheckbox, LegendAsHeading };
</script>

{#snippet Preview()}
  <Fieldset>
    <Fieldset.Legend>Hvilken fjordarm bor du ved?</Fieldset.Legend>
    <Fieldset.Description>Valget vil hjelpe oss å forbedre innholdet vi viser deg.</Fieldset.Description>
    <Radio label="Barsnesfjorden" name="radio" value="barsnesfjorden" />
    <Radio label="Eidsfjorden" name="radio" value="eidsfjorden" />
    <Radio label="Ingen av de" name="radio" value="ingen-av-de" />
  </Fieldset>
{/snippet}

{#snippet WithCheckbox()}
  <Fieldset>
    <Fieldset.Legend>Godtar du vilkårene?</Fieldset.Legend>
    <Checkbox label="Ja, jeg godtar" />
  </Fieldset>
{/snippet}

{#snippet LegendAsHeading()}
  <Fieldset>
    <Fieldset.Legend><h1>Hvor skal du reise?</h1></Fieldset.Legend>
  </Fieldset>
{/snippet}
