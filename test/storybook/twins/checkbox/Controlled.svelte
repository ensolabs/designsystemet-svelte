<!-- Controlled: education levels from useCheckboxGroup, with a removable chip per chosen level (setValue) and a button
     that clears them. -->
<script lang="ts">
  import { Button, Checkbox, Chip, Divider, Fieldset, Paragraph, ValidationMessage, useCheckboxGroup } from '../../../../src';

  // Storybook's context.id, which the story runtime leaves out.
  const id = undefined;
  const choices: Record<string, { label: string }> = {
    barnehage: { label: 'Barnehage' },
    grunnskole: { label: 'Grunnskole' },
    videregaende: { label: 'Videregående' },
  };
  const group = useCheckboxGroup({ name: 'my-controlled', value: ['barnehage', 'videregaende'], label: '' } as Parameters<typeof useCheckboxGroup>[0]);

  const toggle = (haystack: string[], needle: string) =>
    haystack.includes(needle) ? haystack.filter((value) => value !== needle) : haystack.concat(needle);

  const isFiltered = $derived(group.value.length > 0);
</script>

<Fieldset>
  <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
  {#each Object.entries(choices) as [value, { label }] (value)}
    <Checkbox {...group.getCheckboxProps(value)} id="{id}-{value}" {label} />
  {/each}
</Fieldset>
<ValidationMessage {...group.validationMessageProps} />
<Divider />
<Paragraph>(Annet innhold)</Paragraph>
<Divider />
<div style="display: flex; gap: var(--ds-size-2)">
  <Paragraph>{isFiltered ? 'Viser innhold for:' : 'Viser alt innhold'}</Paragraph>
  {#if isFiltered}
    {#each group.value as v (v)}
      <Chip.Removable aria-label="Slett {choices[v].label}" onclick={() => group.setValue(toggle(group.value, v))}>
        {choices[v].label}
      </Chip.Removable>
    {/each}
  {/if}
</div>
{#if isFiltered}
  <Button style="width: fit-content" variant="secondary" onclick={() => group.setValue([])}>Tøm filtre</Button>
{/if}
