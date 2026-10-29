<!-- Svelte twins of packages/react/src/components/input/input.stories.tsx. -->
<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { Field, Heading, Input, Label, ValidationMessage } from '../../../src';
  import Controlled_ from './input/Controlled.svelte';

  export { Checkbox, Controlled, HtmlSize, Preview, Radio, Switch, Text };

  type Size = 'sm' | 'md' | 'lg';
  type State = { label: string; props: Record<string, unknown> };

  const sizes: Size[] = ['sm', 'md', 'lg'];
  const sizenames = { sm: 'Small', md: 'Medium', lg: 'Large' };

  const textStates: State[] = [
    { label: 'Default', props: {} },
    { label: 'Disabled', props: { disabled: true } },
    { label: 'Invalid', props: { 'aria-invalid': true } },
    { label: 'Read-only', props: { readonly: true } },
  ];

  const radioStates: State[] = [
    { label: 'Default', props: {} },
    { label: 'Checked', props: { checked: true } },
    { label: 'Disabled', props: { disabled: true } },
    { label: 'Disabled checked', props: { disabled: true, checked: true } },
    { label: 'Invalid', props: { 'aria-invalid': true } },
    { label: 'Invalid checked', props: { 'aria-invalid': true, checked: true } },
    { label: 'Read-only', props: { readonly: true } },
    { label: 'Read-only checked', props: { readonly: true, checked: true } },
  ];

  const checkboxStates: State[] = [
    { label: 'Default', props: {} },
    { label: 'Checked', props: { checked: true } },
    { label: 'Indeterminate', props: { 'data-indeterminate': true } },
    { label: 'Disabled', props: { disabled: true } },
    { label: 'Disabled checked', props: { disabled: true, checked: true } },
    { label: 'Disabled indeterminate', props: { disabled: true, 'data-indeterminate': true } },
    { label: 'Invalid', props: { 'aria-invalid': true } },
    { label: 'Invalid checked', props: { 'aria-invalid': true, checked: true } },
    { label: 'Invalid indeterminate', props: { 'aria-invalid': true, 'data-indeterminate': true } },
    { label: 'Read-only', props: { readonly: true } },
    { label: 'Read-only checked', props: { readonly: true, checked: true } },
    { label: 'Read-only indeterminate', props: { readonly: true, 'data-indeterminate': true } },
  ];

  const switchStates: State[] = [
    { label: 'Default', props: {} },
    { label: 'Checked', props: { checked: true } },
    { label: 'Disabled', props: { disabled: true } },
    { label: 'Disabled checked', props: { disabled: true, checked: true } },
    { label: 'Read-only', props: { readonly: true } },
    { label: 'Read-only checked', props: { readonly: true, checked: true } },
  ];

  const kebab = (label: string) => label.toLowerCase().replace(' ', '-');
</script>

<!-- The stories' decorator. -->
{#snippet decorator(story: Snippet)}
  <div style="display: flex; gap: var(--ds-size-2); flex-direction: column">{@render story()}</div>
{/snippet}

{#snippet Preview()}
  {#snippet story()}
    <Input aria-invalid={false} disabled={false} readonly={false} type="text" name="inputs" aria-label="input" />
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet HtmlSize()}
  {#snippet story()}
    <Field>
      <Label>Input with size</Label>
      <Input size={10} />
    </Field>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet Controlled()}
  {@render decorator(controlled)}
{/snippet}
{#snippet controlled()}<Controlled_ />{/snippet}

{#snippet Text()}
  {#snippet story()}
    <div>
      {#each sizes as size (size)}
        <div data-size={size} style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 90vw">
          <Heading data-size="2xs" style="grid-column: 1 / -1">{sizenames[size]}</Heading>
          {#each textStates as state (state.label)}
            <Field>
              <Label>{state.label}</Label>
              <Input value="Value" name={`${size}-${state.label.toLowerCase()}`} {...state.props} data-size={size} />
              {#if state.label === 'Invalid'}<ValidationMessage>Feilmelding</ValidationMessage>{/if}
            </Field>
          {/each}
        </div>
      {/each}
    </div>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet Radio()}
  {#snippet story()}
    <div>
      {#each sizes as size (size)}
        <div data-size={size} style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 90vw">
          <Heading data-size="2xs" style="grid-column: 1 / -1; margin-top: 16px">{sizenames[size]}</Heading>
          {#each radioStates as state (state.label)}
            <Field>
              <Input type="radio" name={`${size}-${state.label.split(' ')[0]}`} {...state.props} />
              <Label>{state.label}</Label>
            </Field>
          {/each}
        </div>
      {/each}
    </div>
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet Checkbox()}
  {#snippet story()}
    {#each sizes as size (size)}
      <div data-size={size} style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem">
        <Heading data-size="2xs" style="grid-column: 1 / -1">{sizenames[size]}</Heading>
        {#each checkboxStates as state (state.label)}
          <Field>
            <Input type="checkbox" name={`${size}-${kebab(state.label)}`} {...state.props} />
            <Label>{state.label}</Label>
          </Field>
        {/each}
      </div>
    {/each}
  {/snippet}
  {@render decorator(story)}
{/snippet}

{#snippet Switch()}
  {#snippet story()}
    {#each sizes as size (size)}
      <div data-size={size} style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 90vw">
        <Heading data-size="2xs" style="grid-column: 1 / -1">{sizenames[size]}</Heading>
        {#each switchStates as state (state.label)}
          <Field>
            <Input type="checkbox" role="switch" name={`${size}-${kebab(state.label)}`} {...state.props} />
            <Label>{state.label}</Label>
          </Field>
        {/each}
      </div>
    {/each}
  {/snippet}
  {@render decorator(story)}
{/snippet}
