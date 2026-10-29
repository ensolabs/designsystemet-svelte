<!-- Controlled: education levels as checkboxes bound to one array, with a removable chip per chosen level and a button
     that clears them. -->
<script lang="ts">
  import { Button, Checkbox, Chip, Divider, Fieldset, Paragraph, ValidationMessage } from '../../../../src';

  const id = 'komponenter-checkbox--controlled';
  const choices: Record<string, { label: string }> = {
    barnehage: { label: 'Barnehage' },
    grunnskole: { label: 'Grunnskole' },
    videregaende: { label: 'Videregående' },
  };
  const uid = $props.id();
  const errorId = `${uid}-error`;

  let value = $state(['barnehage', 'videregaende']);
  const isFiltered = $derived(value.length > 0);
</script>

<Fieldset>
  <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
  {#each Object.entries(choices) as [choice, { label }] (choice)}
    <Checkbox name="my-controlled" value={choice} bind:group={value} id="{id}-{choice}" {label} />
  {/each}
</Fieldset>
<ValidationMessage id={errorId} hidden />
<Divider />
<Paragraph>(Annet innhold)</Paragraph>
<Divider />
<div style="display: flex; gap: var(--ds-size-2)">
  <Paragraph>{isFiltered ? 'Viser innhold for:' : 'Viser alt innhold'}</Paragraph>
  {#each value as v (v)}
    <Chip.Removable aria-label="Slett {choices[v].label}" onclick={() => (value = value.filter((x) => x !== v))}>
      {choices[v].label}
    </Chip.Removable>
  {/each}
</div>
{#if isFiltered}
  <Button style="width: fit-content" variant="secondary" onclick={() => (value = [])}>Tøm filtre</Button>
{/if}
