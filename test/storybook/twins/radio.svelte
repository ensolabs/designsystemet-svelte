<!-- Svelte twins of packages/react/src/components/radio/radio.stories.tsx. -->
<script module lang="ts">
  import { Fieldset, Radio, ValidationMessage } from '../../../src';

  export { Preview, AriaLabel, Group, WithError, ReadOnly, Inline, Outline, End };

  const icecream = [
    { label: 'Vanilje', value: 'vanilje' },
    { label: 'Jordbær', description: 'Jordbær er best', value: 'jordbær' },
    { label: 'Sjokolade', value: 'sjokolade' },
    { label: 'Jeg spiser ikke iskrem', value: 'spiser-ikke-is' },
  ];
  const districts = [
    { label: 'Østbyen', value: 'ostbyen' },
    { label: 'Lerkendal', value: 'lerkendal' },
    { label: 'Heimdal', value: 'heimdal' },
    { label: 'Midtbyen', value: 'midtbyen' },
  ];
</script>

{#snippet Preview()}
  <Radio label="Radio" description="Description" disabled={false} readonly={false} value="value" name="name" />
{/snippet}

{#snippet AriaLabel()}<Radio value="value" aria-label="Radio" />{/snippet}

{#snippet icecreamGroup(position?: 'end')}
  <Fieldset>
    <Fieldset.Legend>Hvilken iskremsmak er best?</Fieldset.Legend>
    <Fieldset.Description>Velg din favorittsmak blant alternativene.</Fieldset.Description>
    {#each icecream as { label, description, value } (value)}
      <Radio {position} {label} {description} {value} name="icecream" />
    {/each}
  </Fieldset>
{/snippet}

{#snippet Group()}{@render icecreamGroup()}{/snippet}

{#snippet WithError()}
  <Fieldset>
    <Fieldset.Legend>Hvilken bydel bor du i?</Fieldset.Legend>
    <Fieldset.Description>Trondheim er delt inn i fire bydeler</Fieldset.Description>
    {#each districts as { label, value } (value)}
      <Radio {label} {value} name="city" aria-invalid="true" />
    {/each}
    <ValidationMessage data-color="danger">Du må velge en bydel før du kan fortsette.</ValidationMessage>
  </Fieldset>
{/snippet}

{#snippet ReadOnly()}
  <Fieldset>
    <Fieldset.Legend>Hvilken bydel bor du i?</Fieldset.Legend>
    <Fieldset.Description>Trondheim er delt inn i fire bydeler</Fieldset.Description>
    {#each districts as { label, value } (value)}
      <Radio {label} {value} name="city" readonly checked={value === 'heimdal' || undefined} />
    {/each}
  </Fieldset>
{/snippet}

{#snippet Inline()}
  <Fieldset>
    <Fieldset.Legend>Kontaktes på e-post?</Fieldset.Legend>
    <Fieldset.Description>Bekreft om du ønsker å bli kontaktet per e-post.</Fieldset.Description>
    <div style="display: flex; flex-wrap: wrap; gap: var(--ds-size-6)">
      <Radio name="my-inline" label="Ja" value="ja" />
      <Radio name="my-inline" label="Nei" value="nei" />
    </div>
  </Fieldset>
{/snippet}

{#snippet Outline()}
  <Fieldset>
    <Fieldset.Legend>Using variant="outline"</Fieldset.Legend>
    <Radio variant="outline" label="with description" description="description text" value="description" />
    <Radio variant="outline" label="Checked" value="checked" checked />
    <Radio variant="outline" label="with error state" value="error" error="the error message" />
    <Radio variant="outline" disabled label="disabled" value="disabled" />
    <Radio variant="outline" readonly label="readonly checked" value="readonly" checked />
  </Fieldset>
{/snippet}

{#snippet End()}{@render icecreamGroup('end')}{/snippet}
