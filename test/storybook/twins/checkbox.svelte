<!-- Svelte twins of packages/react/src/components/checkbox/checkbox.stories.tsx. The stories built on useCheckboxGroup
     bind the checkboxes to one array with bind:group, and pass the group's name, disabled, readonly and error to each, as
     the hook's getCheckboxProps does. -->
<script module lang="ts">
  import { Checkbox, Fieldset } from '../../../src';
  import Conditional from './checkbox/Conditional.svelte';
  import ContactGroup from './checkbox/ContactGroup.svelte';
  import Controlled from './checkbox/Controlled.svelte';
  import InTable from './checkbox/InTable.svelte';
  import InTableWithPagination from './checkbox/InTableWithPagination.svelte';

  export {
    Preview,
    AriaLabel,
    Group,
    OneOption,
    WithError,
    ControlledStory as Controlled,
    ReadOnly,
    Disabled,
    InTableStory as InTable,
    ConditionalStory as Conditional,
    InTableWithPaginationStory as InTableWithPagination,
    ContentEx1,
    ContentEx2,
    ContentEx3,
    hiddenLegend,
    Outline,
    End,
  };
</script>

{#snippet Preview()}
  <Checkbox label="Checkbox label" description="Description" disabled={false} readonly={false} value="value" />
{/snippet}

{#snippet AriaLabel()}<Checkbox label="" value="value" aria-label="Checkbox" />{/snippet}

{#snippet Group()}<ContactGroup name="my-group" disabled={false} error="" />{/snippet}

{#snippet OneOption()}
  <Fieldset>
    <Fieldset.Legend>Bekreft at du er over 18 år</Fieldset.Legend>
    <Fieldset.Description>
      For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at du er myndig.
    </Fieldset.Description>
    <Checkbox label="Jeg bekrefter at jeg er over 18 år" value="samtykke" />
  </Fieldset>
{/snippet}

{#snippet WithError()}
  <ContactGroup name="my-error" disabled={false} error="Du må velge minst to kontaktalternativ" />
{/snippet}

{#snippet ControlledStory()}<Controlled />{/snippet}

{#snippet ReadOnly()}<ContactGroup name="my-readonly" readonly />{/snippet}

{#snippet Disabled()}<ContactGroup name="my-disabled" disabled />{/snippet}

{#snippet InTableStory()}<InTable />{/snippet}

{#snippet ConditionalStory()}<Conditional />{/snippet}

{#snippet InTableWithPaginationStory()}<InTableWithPagination />{/snippet}

{#snippet ContentEx1()}
  <Fieldset>
    <Fieldset.Legend>Hvor lenge har du jobbet i det offentlige?</Fieldset.Legend>
    <Checkbox label="I under ett år" value="0-3" />
    <Checkbox label="Fra 1-3 år" value="1-3" />
    <Checkbox label="Mer enn 3 år" value="3+" />
  </Fieldset>
{/snippet}

{#snippet ContentEx2()}
  <Fieldset>
    <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
    <Checkbox label="Jeg liker å jobbe med selvstendige oppgaver" value="selvstendige" />
    <Checkbox label="Jeg elsker møter" value="moter" />
    <Checkbox label="Lunsjen er best" value="lunsj" />
    <Checkbox label="Jeg liker å møte kolleger" value="kolleger" />
  </Fieldset>
{/snippet}

{#snippet ContentEx3()}
  <Fieldset>
    <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
    <Checkbox label="Selvstendige oppgaver" value="selvstendige" />
    <Checkbox label="Møter" value="moter" />
    <Checkbox label="Lunsj" value="lunsj" />
    <Checkbox label="Kolleger" value="kolleger" />
  </Fieldset>
{/snippet}

{#snippet hiddenLegend()}
  <Fieldset>
    <Fieldset.Legend class="ds-sr-only">Tekst for skjermleser</Fieldset.Legend>
    <Checkbox label="Test av skjermleser legend" value="selvstendige" />
  </Fieldset>
{/snippet}

{#snippet Outline()}
  <Fieldset>
    <Fieldset.Legend>Using variant="outline"</Fieldset.Legend>
    <Checkbox variant="outline" label="with description" description="description text" value="description" />
    <Checkbox variant="outline" label="Checked" value="checked" checked />
    <Checkbox variant="outline" label="with error state" value="error" error="the error message" />
    <Checkbox variant="outline" disabled label="disabled not checked" value="disabled" />
    <Checkbox variant="outline" disabled label="disabled" value="disabled" checked />
    <Checkbox variant="outline" readonly label="readonly not checked" value="readonly2" />
    <Checkbox variant="outline" readonly label="readonly checked" value="readonly" checked />
  </Fieldset>
{/snippet}

{#snippet End()}<ContactGroup position="end" />{/snippet}
