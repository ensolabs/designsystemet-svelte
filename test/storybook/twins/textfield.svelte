<!-- Svelte twins of packages/react/src/components/textfield/textfield.stories.tsx. -->
<script module lang="ts">
  import { Tag, Textfield } from '../../../src';
  import Controlled_ from './textfield/Controlled.svelte';

  export { Affix, Controlled, Counter, DateInputs, Preview, Required, Rows };
</script>

{#snippet Preview()}
  <Textfield label="Label" disabled={false} readonly={false} multiline={false} description="" error="" counter={0} />
{/snippet}

{#snippet Rows()}<Textfield label="Label" multiline rows={4} />{/snippet}

{#snippet Affix()}<Textfield prefix="NOK" suffix="pr. mnd" label="Hvor mange kroner koster det per måned?" />{/snippet}

{#snippet Counter()}<Textfield counter={10} label="Hvor mange kroner koster det per måned?" />{/snippet}

{#snippet Controlled()}<Controlled_ />{/snippet}

{#snippet DateInputs()}
  <Textfield label="text" type="text" />
  <Textfield label="tel" type="tel" />
  <Textfield label="time" type="time" />
  <Textfield label="date" type="date" />
  <Textfield label="datetime-local" type="datetime-local" />
  <Textfield label="month" type="month" />
  <Textfield label="week" type="week" />
{/snippet}

{#snippet Required()}
  <!-- No space before the Tag: JSX leaves none, and it would show. -->
  {#snippet label()}Hvor bor du?<Tag data-color="warning" style="margin-inline-start: var(--ds-size-2)">Må fylles ut</Tag>{/snippet}
  <Textfield {label} required />
{/snippet}
