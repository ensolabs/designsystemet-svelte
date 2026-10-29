<!-- Svelte twins of packages/react/src/components/search/search.stories.tsx. -->
<script module lang="ts">
  import { Divider, Field, Label, Search } from '../../../src';
  import Controlled_ from './search/Controlled.svelte';
  import Form_ from './search/Form.svelte';

  export { Controlled, DeprecatedMarkup, Form, Preview, Variants, WithLabel };
</script>

{#snippet Preview()}
  <Search>
    <Search.Input aria-label="Søk" type="text" />
    <Search.Clear />
    <Search.Button />
  </Search>
{/snippet}

{#snippet Controlled()}<Controlled_ />{/snippet}

{#snippet Variants()}
  <Search>
    <Search.Input aria-label="Søk" />
    <Search.Clear />
  </Search>

  <Divider style="margin-top: var(--ds-size-4)" />

  <Search>
    <Search.Input aria-label="Søk" type="text" />
    <Search.Clear />
    <Search.Button />
  </Search>

  <Divider style="margin-top: var(--ds-size-4)" />

  <Search>
    <Search.Input aria-label="Søk" type="text" />
    <Search.Clear />
    <Search.Button variant="secondary" />
  </Search>
{/snippet}

{#snippet WithLabel()}
  <Field>
    <Label>Søk etter katter</Label>
    <Search>
      <Search.Input name="cat-search" type="text" />
      <Search.Clear />
      <Search.Button />
    </Search>
  </Field>
{/snippet}

{#snippet Form()}<Form_ />{/snippet}

<!-- Upstream writes this story as raw markup, to show the markup from before Search was a component. -->
{#snippet DeprecatedMarkup()}
  <div class="ds-search">
    <input class="ds-input" type="search" placeholder="" aria-label="Søk" />
    <button class="ds-button" data-icon="true" data-variant="tertiary" type="reset" aria-label="Tøm"></button>
    <button class="ds-button" type="submit">Søk</button>
  </div>
{/snippet}
