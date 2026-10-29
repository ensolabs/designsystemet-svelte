<!-- Svelte twins of packages/react/src/components/tooltip/tooltip.stories.tsx. -->
<script module lang="ts">
  import { Button, Link, Tooltip } from '../../../src';
  import FilesIcon from './icons/FilesIcon.svelte';
  import WithDynamicCSSTooltipTextStory from './tooltip/WithDynamicCSSTooltipText.svelte';
  import WithDynamicTooltipTextStory from './tooltip/WithDynamicTooltipText.svelte';

  export {
    Preview,
    WithLink,
    WithSpan,
    WithPlainText,
    WithString,
    Placement,
    Aria,
    WithDynamicTooltipText,
    WithCSSTooltipText,
    WithDynamicCSSTooltipText,
    Sizes,
  };
</script>

{#snippet Preview()}
  <Tooltip content="Kopier" placement="top">
    {#snippet child({ props })}<Button icon {...props}><FilesIcon aria-hidden /></Button>{/snippet}
  </Tooltip>
{/snippet}

{#snippet WithLink()}
  <Tooltip content="Gå til en annen side..." placement="top">
    {#snippet child({ props })}<Link href="#" {...props}>En lenke</Link>{/snippet}
  </Tooltip>
{/snippet}

{#snippet WithSpan()}
  <Tooltip content="Innholdet i tooltipen" placement="top">
    {#snippet child({ props })}<span {...props}>Tekst med tooltip</span>{/snippet}
  </Tooltip>
{/snippet}

{#snippet WithPlainText()}
  <Tooltip content="Innholdet i tooltipen" placement="top">Tekst med tooltip</Tooltip>
{/snippet}

{#snippet WithString()}
  <Tooltip content="Organisasjonsnummer" tabindex={0}>Org.nr.</Tooltip>
{/snippet}

{#snippet Placement()}
  <Tooltip content="Kopier" placement="bottom">
    {#snippet child({ props })}<Button icon {...props}><FilesIcon aria-hidden /></Button>{/snippet}
  </Tooltip>
{/snippet}

{#snippet Aria()}
  <Tooltip content="Beskrivelse for aria-description">
    {#snippet child({ props })}<Button {...props}>Eg er aria-description</Button>{/snippet}
  </Tooltip>
  <Tooltip content="Beskrivelse for aria-description">
    {#snippet child({ props })}
      <Button {...props}><FilesIcon aria-hidden /><span>Eg er også aria-description</span></Button>
    {/snippet}
  </Tooltip>
  <Tooltip content="Eg er aria-label">
    {#snippet child({ props })}<Button icon {...props}><FilesIcon aria-hidden /></Button>{/snippet}
  </Tooltip>
{/snippet}

{#snippet WithDynamicTooltipText()}<WithDynamicTooltipTextStory />{/snippet}

{#snippet WithCSSTooltipText()}
  <Tooltip content="">
    {#snippet child({ props })}<Button style={'--ds-tooltip: "Kopier"'} {...props}><FilesIcon aria-hidden /></Button>{/snippet}
  </Tooltip>
{/snippet}

{#snippet WithDynamicCSSTooltipText()}<WithDynamicCSSTooltipTextStory />{/snippet}

{#snippet Sizes()}
  {#each ['sm', 'md', 'lg'] as const as size (size)}
    <Tooltip content="Kopier">
      {#snippet child({ props })}<Button data-size={size} icon {...props}><FilesIcon aria-hidden /></Button>{/snippet}
    </Tooltip>
  {/each}
{/snippet}
