<!-- Svelte twins of the stories in inputs.test.tsx: the same name, the same markup. -->
<script module lang="ts">
  import { Field, Input, Label } from '../../src';
  import { ErrorSummary, ErrorSummaryHeading, ErrorSummaryItem, ErrorSummaryLink, ErrorSummaryList } from '../../src/error-summary';
  import { EXPERIMENTAL_FileUpload } from '../../src/file-upload';
  import { Search, SearchButton, SearchClear, SearchInput } from '../../src/search';
  import {
    EXPERIMENTAL_Suggestion,
    EXPERIMENTAL_SuggestionClear,
    EXPERIMENTAL_SuggestionEmpty,
    EXPERIMENTAL_SuggestionInput,
    EXPERIMENTAL_SuggestionList,
    EXPERIMENTAL_SuggestionOption,
    EXPERIMENTAL_SuggestionToggle,
  } from '../../src/suggestion';

  export {
    search,
    searchOptions,
    searchFlat,
    errorSummary,
    errorSummaryOptions,
    errorSummaryFlat,
    fileUpload,
    suggestion,
    suggestionSelected,
    suggestionMultiple,
    suggestionCreatable,
    suggestionParts,
    suggestionFilter,
    suggestionFlat,
    suggestionInputValue,
  };
</script>

{#snippet search()}
  <Search>
    <Search.Input aria-label="Søk" />
    <Search.Clear />
    <Search.Button />
  </Search>
{/snippet}

{#snippet searchOptions()}
  <form>
    <Search class="extra" data-size="sm" data-color="neutral" data-sr-clear="Tøm">
      <Search.Input type="text" name="q" value="sykehus" placeholder="Søk i prosjekter" />
      <Search.Clear aria-label="Tøm søket" />
      <Search.Button variant="secondary" data-size="lg">Finn</Search.Button>
    </Search>
  </form>
{/snippet}

{#snippet searchFlat()}
  <Search>
    <SearchInput aria-label="Søk" />
    <SearchClear />
    <SearchButton icon aria-label="Søk"><svg></svg></SearchButton>
    <SearchButton type="button">
      {#snippet child({ props })}<a href="/sok" {...props}>Avansert</a>{/snippet}
    </SearchButton>
  </Search>
{/snippet}

{#snippet errorSummary()}
  <ErrorSummary>
    <ErrorSummary.Heading>Rett opp feilene for å gå videre</ErrorSummary.Heading>
    <ErrorSummary.List>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#navn">Skriv et navn</ErrorSummary.Link>
      </ErrorSummary.Item>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#areal">Skriv arealet som et tall</ErrorSummary.Link>
      </ErrorSummary.Item>
    </ErrorSummary.List>
  </ErrorSummary>
{/snippet}

{#snippet errorSummaryOptions()}
  <ErrorSummary class="extra" data-size="sm" data-color="warning" aria-label="Feil">
    <ErrorSummary.Heading level={3} data-size="xs" class="h">Feil</ErrorSummary.Heading>
    <ErrorSummary.List class="l" data-size="lg">
      <ErrorSummary.Item class="i">
        <ErrorSummary.Link href="#a" data-color="danger" class="a">Feil i A</ErrorSummary.Link>
      </ErrorSummary.Item>
    </ErrorSummary.List>
  </ErrorSummary>
  <ErrorSummary>
    {#snippet child({ props })}<section {...props}><h2>Som section</h2></section>{/snippet}
  </ErrorSummary>
{/snippet}

{#snippet errorSummaryFlat()}
  <ErrorSummary>
    <ErrorSummaryHeading>
      {#snippet child({ props })}<h4 {...props}>Overskrift</h4>{/snippet}
    </ErrorSummaryHeading>
    <ErrorSummaryList>
      <ErrorSummaryItem>
        {#snippet child({ props })}<li {...props} data-x="y"><ErrorSummaryLink href="#b">Feil i B</ErrorSummaryLink></li>{/snippet}
      </ErrorSummaryItem>
      <ErrorSummaryItem>
        <ErrorSummaryLink>
          {#snippet child({ props })}<button {...props}>Feil i C</button>{/snippet}
        </ErrorSummaryLink>
      </ErrorSummaryItem>
    </ErrorSummaryList>
  </ErrorSummary>
{/snippet}

{#snippet fileUpload()}
  <EXPERIMENTAL_FileUpload class="extra" data-size="sm" id="opplasting">
    <Field>
      <Label>Last opp tegninger</Label>
      <Field.Description>PDF eller DWG, maks 10 MB</Field.Description>
      <Input type="file" multiple accept=".pdf,.dwg" />
    </Field>
  </EXPERIMENTAL_FileUpload>
{/snippet}

{#snippet suggestion()}
  <Field>
    <Label>Kommune</Label>
    <EXPERIMENTAL_Suggestion>
      <EXPERIMENTAL_Suggestion.Input />
      <EXPERIMENTAL_Suggestion.Clear />
      <EXPERIMENTAL_Suggestion.List>
        <EXPERIMENTAL_Suggestion.Empty>Ingen treff</EXPERIMENTAL_Suggestion.Empty>
        <EXPERIMENTAL_Suggestion.Option value="0301">Oslo</EXPERIMENTAL_Suggestion.Option>
        <EXPERIMENTAL_Suggestion.Option value="4601">Bergen</EXPERIMENTAL_Suggestion.Option>
        <EXPERIMENTAL_Suggestion.Option value="5001" label="Trondheim">Trondheim (Trøndelag)</EXPERIMENTAL_Suggestion.Option>
      </EXPERIMENTAL_Suggestion.List>
    </EXPERIMENTAL_Suggestion>
  </Field>
{/snippet}

{#snippet suggestionSelected()}
  <EXPERIMENTAL_Suggestion defaultSelected={{ label: 'Bergen', value: '4601' }} name="kommune" id="kommune">
    <EXPERIMENTAL_Suggestion.Input aria-label="Kommune" />
    <EXPERIMENTAL_Suggestion.List>
      <EXPERIMENTAL_Suggestion.Option value="0301">Oslo</EXPERIMENTAL_Suggestion.Option>
      <EXPERIMENTAL_Suggestion.Option value="4601">Bergen</EXPERIMENTAL_Suggestion.Option>
    </EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
  <EXPERIMENTAL_Suggestion selected="Oslo" name="by">
    <EXPERIMENTAL_Suggestion.Input aria-label="By" />
    <EXPERIMENTAL_Suggestion.List>
      <EXPERIMENTAL_Suggestion.Option>Oslo</EXPERIMENTAL_Suggestion.Option>
      <EXPERIMENTAL_Suggestion.Option>Bergen</EXPERIMENTAL_Suggestion.Option>
    </EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
{/snippet}

{#snippet suggestionMultiple()}
  <EXPERIMENTAL_Suggestion multiple defaultSelected={['Oslo', { label: 'Bergen', value: '4601' }]} name="kommuner" class="extra" data-size="sm">
    {#snippet renderSelected({ label, value })}<b data-value={value}>{label}</b>{/snippet}
    <EXPERIMENTAL_Suggestion.Input aria-label="Kommuner" />
    <EXPERIMENTAL_Suggestion.Toggle />
    <EXPERIMENTAL_Suggestion.List>
      <EXPERIMENTAL_Suggestion.Option>Oslo</EXPERIMENTAL_Suggestion.Option>
      <EXPERIMENTAL_Suggestion.Option value="4601">Bergen</EXPERIMENTAL_Suggestion.Option>
      <EXPERIMENTAL_Suggestion.Option value="1103">Stavanger</EXPERIMENTAL_Suggestion.Option>
    </EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
{/snippet}

{#snippet suggestionCreatable()}
  <EXPERIMENTAL_Suggestion creatable multiple data-sr-singular="%d forslag" data-sr-plural="%d forslag" data-sr-clear="Tøm">
    <EXPERIMENTAL_Suggestion.Input aria-label="Stikkord" />
    <EXPERIMENTAL_Suggestion.Clear />
    <EXPERIMENTAL_Suggestion.List>
      <EXPERIMENTAL_Suggestion.Empty data-empty="Opprett «%s»" />
      <EXPERIMENTAL_Suggestion.Option>Bygg</EXPERIMENTAL_Suggestion.Option>
    </EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
{/snippet}

{#snippet suggestionParts()}
  <EXPERIMENTAL_Suggestion data-color="neutral" data-sr-clear="Tøm">
    <EXPERIMENTAL_Suggestion.Input aria-label="Del" placeholder="Velg" class="i" data-size="lg" disabled />
    <EXPERIMENTAL_Suggestion.Clear aria-label="Fjern" class="c">x</EXPERIMENTAL_Suggestion.Clear>
    <EXPERIMENTAL_Suggestion.Toggle aria-label="Vis alle" class="t" />
    <EXPERIMENTAL_Suggestion.List class="l" singular="%d treff" plural="%d treff" id="liste" autoPlacement={false} data-size="sm">
      <EXPERIMENTAL_Suggestion.Empty class="e" data-color="danger">Ingen</EXPERIMENTAL_Suggestion.Empty>
      <EXPERIMENTAL_Suggestion.Option value="a" label="A" class="o" disabled data-size="sm">Alfa</EXPERIMENTAL_Suggestion.Option>
    </EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
{/snippet}

{#snippet suggestionFilter()}
  <EXPERIMENTAL_Suggestion filter={false}>
    <EXPERIMENTAL_Suggestion.Input aria-label="Uten filter" />
    <EXPERIMENTAL_Suggestion.List><EXPERIMENTAL_Suggestion.Option>Oslo</EXPERIMENTAL_Suggestion.Option></EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
  <EXPERIMENTAL_Suggestion defaultSelected="Oslo" filter={({ index }) => index > 0}>
    <EXPERIMENTAL_Suggestion.Input aria-label="Med filter" />
    <EXPERIMENTAL_Suggestion.List>
      <EXPERIMENTAL_Suggestion.Option>Oslo</EXPERIMENTAL_Suggestion.Option>
      <EXPERIMENTAL_Suggestion.Option>Bergen</EXPERIMENTAL_Suggestion.Option>
    </EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
{/snippet}

{#snippet suggestionFlat()}
  <EXPERIMENTAL_Suggestion>
    <EXPERIMENTAL_SuggestionInput aria-label="Flat" />
    <EXPERIMENTAL_SuggestionClear />
    <EXPERIMENTAL_SuggestionToggle />
    <EXPERIMENTAL_SuggestionList>
      <EXPERIMENTAL_SuggestionEmpty>Ingen</EXPERIMENTAL_SuggestionEmpty>
      <EXPERIMENTAL_SuggestionOption>Oslo</EXPERIMENTAL_SuggestionOption>
    </EXPERIMENTAL_SuggestionList>
  </EXPERIMENTAL_Suggestion>
{/snippet}

{#snippet suggestionInputValue()}
  <EXPERIMENTAL_Suggestion>
    <EXPERIMENTAL_Suggestion.Input aria-label="Med value" value="Oslo" onchange={() => {}} />
    <EXPERIMENTAL_Suggestion.List><EXPERIMENTAL_Suggestion.Option>Oslo</EXPERIMENTAL_Suggestion.Option></EXPERIMENTAL_Suggestion.List>
  </EXPERIMENTAL_Suggestion>
{/snippet}
