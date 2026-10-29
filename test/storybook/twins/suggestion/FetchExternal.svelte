<script lang="ts">
  import { Field, Label, Spinner, EXPERIMENTAL_Suggestion as Suggestion } from '../../../../src';

  let value = $state('');
  let options = $state<string[] | null>(null);

  const apiCall = async (value: string) => {
    const api = `https://restcountries.com/v2/name/${value}?fields=name`;
    const countries = await (await fetch(api)).json();
    options = Array.isArray(countries) ? countries.map(({ name }) => name) : [];
  };

  // useDebounceCallback(apiCall, 500)
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => apiCall(value), 500);
  };
  $effect(() => () => clearTimeout(timer));

  const handleInput = (event: Event & { currentTarget: HTMLInputElement }) => {
    const encoded = encodeURIComponent(event.currentTarget.value.trim());
    value = event.currentTarget.value;
    options = null; // Clear options

    if (!encoded) return;

    debounced(encoded);
  };
</script>

<Field lang="en">
  <Label>Search for countries (in english)</Label>
  <Suggestion filter={false} data-sr-singular="%d country" data-sr-plural="%d countries">
    <Suggestion.Input type="search" oninput={handleInput} />
    <Suggestion.Toggle />
    <Suggestion.Clear />
    <!-- No whitespace between the blocks: it would leave a space in the empty list, and show it. -->
    <Suggestion.List>
      {#if value}
        <Suggestion.Empty>
          {#if options}
            Ingen treff
          {:else}
            <span style="display: flex; align-items: center; gap: 8px">
              <Spinner aria-hidden="true" data-size="sm" /> Laster...
            </span>
          {/if}
        </Suggestion.Empty>
      {/if}{#each options ?? [] as option (option)}
        <Suggestion.Option>{option}</Suggestion.Option>
      {/each}
    </Suggestion.List>
  </Suggestion>
</Field>
