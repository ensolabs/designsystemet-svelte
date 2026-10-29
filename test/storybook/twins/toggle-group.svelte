<!-- Svelte twins of packages/react/src/components/toggle-group/toggle-group.stories.tsx. The meta's decorator wraps
     every story in <div style="max-width: 80vw">. -->
<script module lang="ts">
  import type { Component } from 'svelte';
  import { ToggleGroup, Tooltip } from '../../../src';
  import AlignCenterIcon from './icons/AlignCenterIcon.svelte';
  import AlignLeftIcon from './icons/AlignLeftIcon.svelte';
  import AlignRightIcon from './icons/AlignRightIcon.svelte';
  import Kontrollert from './toggle-group/Kontrollert.svelte';

  export {
    Preview,
    OnlyIcons,
    KontrollertStory as Kontrollert,
    Secondary,
    SecondaryOnlyIcons,
    Disabled,
    ReadOnly,
    AriaDisabled,
  };

  const alignments: [string, string, Component<{ 'aria-hidden'?: boolean }>][] = [
    ['option-1', 'Venstrestilt', AlignLeftIcon],
    ['option-2', 'Midtstilt', AlignCenterIcon],
    ['option-3', 'Høyrestilt', AlignRightIcon],
  ];
</script>


{#snippet mailbox(variant?: 'secondary')}
  <ToggleGroup aria-label="Filtrering" defaultValue="innboks" name="toggle-group-nuts" {variant}>
    <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
    <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>
    <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>
    <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
  </ToggleGroup>
{/snippet}

{#snippet icons(label: string, variant?: 'secondary')}
  <ToggleGroup aria-label={label} defaultValue="option-1" {variant}>
    {#each alignments as [value, content, Icon] (value)}
      <Tooltip {content}>
        {#snippet child({ props })}
          <ToggleGroup.Item {...props} {value}><Icon aria-hidden={true} /></ToggleGroup.Item>
        {/snippet}
      </Tooltip>
    {/each}
  </ToggleGroup>
{/snippet}

{#snippet Preview()}<div style="max-width: 80vw">{@render mailbox()}</div>{/snippet}

{#snippet OnlyIcons()}<div style="max-width: 80vw">{@render icons('Tekstjustering')}</div>{/snippet}

{#snippet KontrollertStory()}<div style="max-width: 80vw"><Kontrollert /></div>{/snippet}

{#snippet Secondary()}<div style="max-width: 80vw">{@render mailbox('secondary')}</div>{/snippet}

{#snippet SecondaryOnlyIcons()}<div style="max-width: 80vw">{@render icons('Filtrering', 'secondary')}</div>{/snippet}

{#snippet Disabled()}
  <div style="max-width: 80vw">
    <ToggleGroup aria-label="Filtrering" defaultValue="innboks">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item disabled value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item disabled value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="Søppelpost">Søppelpost</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  </div>
{/snippet}

{#snippet ReadOnly()}
  <div style="max-width: 80vw">
    <ToggleGroup aria-label="Filtrering" defaultValue="innboks">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item readonly value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item readonly value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="Søppelpost">Søppelpost</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  </div>
{/snippet}

{#snippet AriaDisabled()}
  <div style="max-width: 80vw">
    <ToggleGroup aria-label="Filtrering" defaultValue="innboks">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item aria-disabled="true" value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item aria-disabled="true" value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="Søppelpost">Søppelpost</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  </div>
{/snippet}
