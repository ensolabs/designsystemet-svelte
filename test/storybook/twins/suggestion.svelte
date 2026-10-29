<!-- Svelte twins of packages/react/src/components/suggestion/suggestion.stories.tsx. -->
<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { Details, Field, Label, EXPERIMENTAL_Suggestion as Suggestion, type EventBeforeMatch } from '../../../src';
  import AlwaysShowAll_ from './suggestion/AlwaysShowAll.svelte';
  import ControlledIndependentLabelValue_ from './suggestion/ControlledIndependentLabelValue.svelte';
  import ControlledMultiple_ from './suggestion/ControlledMultiple.svelte';
  import ControlledSingle_ from './suggestion/ControlledSingle.svelte';
  import CustomFilterAlt2_ from './suggestion/CustomFilterAlt2.svelte';
  import { DATA_PLACES } from './suggestion/data';
  import FetchExternal_ from './suggestion/FetchExternal.svelte';

  export {
    AlwaysShowAll,
    AutoPlacementOnXAxis,
    ControlledCreatable,
    ControlledIndependentLabelValue,
    ControlledMultiple,
    ControlledSingle,
    Creatable,
    CustomFilterAlt1,
    CustomFilterAlt2,
    CustomMatching,
    DefaultValue,
    FetchExternal,
    InDetails,
    Multiple,
    Preview,
    WithDeprecatedDel,
    WithoutToggleButton,
  };

  const handleBeforeMatch = (event: EventBeforeMatch) => {
    event.preventDefault(); // Prevent default matching
    const { list, control } = event.currentTarget;
    const value = control?.value.toLowerCase() || '';

    for (const option of Array.from(list?.options || [])) option.selected = option.value.toLowerCase().startsWith(value); // Setting selected indicates a match
  };
</script>

<!-- The stories' decorator: room for the list. -->
{#snippet decorator(story: Snippet)}
  <div style="min-height: 300px">{@render story()}</div>
{/snippet}

<!-- The places as plain options. -->
{#snippet places()}
  {#each DATA_PLACES as place (place)}
    <Suggestion.Option>{place}</Suggestion.Option>
  {/each}
{/snippet}

{#snippet Preview()}
  {#snippet story()}
    <Field>
      <Label>Velg en destinasjon</Label>
      <Suggestion>
        <Suggestion.Input />
        <Suggestion.Toggle />
        <Suggestion.Clear />
        <Suggestion.List id="123">
          <Suggestion.Empty />
          {#each DATA_PLACES as place (place)}
            <Suggestion.Option label={place} value={place}>
              {place}
              <div>Kommune</div>
            </Suggestion.Option>
          {/each}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet ControlledSingle()}
  {#snippet story()}<ControlledSingle_ />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet ControlledCreatable()}
  {#snippet story()}<ControlledSingle_ creatable />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet ControlledMultiple()}
  {#snippet story()}<ControlledMultiple_ />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet ControlledIndependentLabelValue()}
  {#snippet story()}<ControlledIndependentLabelValue_ />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet CustomFilterAlt1()}
  {#snippet story()}
    <Field>
      <Label>Skriv inn et tall mellom 1-6</Label>
      <Suggestion filter={({ index, input }) => !input.value || index === Number(input.value) - 1}>
        <Suggestion.Input />
        <Suggestion.Toggle />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty />
          {#each DATA_PLACES as label (label)}
            <Suggestion.Option value={label.toLowerCase()}>{label}</Suggestion.Option>
          {/each}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet CustomFilterAlt2()}
  {#snippet story()}<CustomFilterAlt2_ />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet CustomMatching()}
  {#snippet story()}
    <Field>
      <Label>Matcher fra første bokstav</Label>
      <Suggestion onBeforeMatch={handleBeforeMatch}>
        <Suggestion.Input />
        <Suggestion.Toggle />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty />
          {@render places()}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet AlwaysShowAll()}
  {#snippet story()}<AlwaysShowAll_ />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet FetchExternal()}
  {#snippet story()}<FetchExternal_ />{/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet DefaultValue()}
  {#snippet story()}
    <Field>
      <Label>Velg en destinasjon</Label>
      <Suggestion selected="Sogndal">
        <Suggestion.Input />
        <Suggestion.Toggle />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty />
          {@render places()}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet Multiple()}
  {#snippet story()}
    <Field>
      <Label>Velg en destinasjon</Label>
      <Suggestion multiple>
        <Suggestion.Input />
        <Suggestion.Toggle />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty />
          {@render places()}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet InDetails()}
  {#snippet story()}
    <Details>
      <Details.Summary>Åpne details som har overflow: clip;</Details.Summary>
      <Details.Content>
        <Field>
          <Label>Velg en destinasjon</Label>
          <Suggestion autofocus>
            <Suggestion.Input />
            <Suggestion.Toggle />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty />
              {@render places()}
            </Suggestion.List>
          </Suggestion>
        </Field>
      </Details.Content>
    </Details>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet AutoPlacementOnXAxis()}
  {#snippet story()}
    <div style="padding-top: 700px">
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion autofocus>
          <Suggestion.Input />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
            {@render places()}
          </Suggestion.List>
        </Suggestion>
      </Field>
    </div>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet Creatable()}
  {#snippet story()}
    <Field>
      <Label>Velg eller legg til en destinasjon</Label>
      <Suggestion multiple creatable>
        <Suggestion.Input />
        <Suggestion.Toggle />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty />
          {@render places()}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet WithoutToggleButton()}
  {#snippet story()}
    <Field>
      <Label>Velg eller legg til en destinasjon</Label>
      <Suggestion multiple creatable>
        <Suggestion.Input />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty />
          {@render places()}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet WithDeprecatedDel()}
  {#snippet story()}
    <Field>
      <Label>Velg eller legg til en destinasjon</Label>
      <Suggestion>
        <Suggestion.Input />
        <!-- The clear button's deprecated markup, as upstream writes it. -->
        <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
        <del role="button" aria-label="Tøm" tabindex={0}></del>
        <Suggestion.List>
          <Suggestion.Empty />
          {@render places()}
        </Suggestion.List>
      </Suggestion>
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}
