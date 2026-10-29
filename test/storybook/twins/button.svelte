<!-- Svelte twins of packages/react/src/components/button/button.stories.tsx. -->
<script module lang="ts">
  import { Button } from '../../../src';
  import { themeColors } from './constants/colors';
  import PencilWritingIcon from './icons/PencilWritingIcon.svelte';

  export { Preview, Variants, Colors, ColorsHover, ColorsPressed, Icons, CombinedColors, AsLink, Loading };
</script>

{#snippet Preview()}<Button disabled={false} variant="primary" icon={false}>Knapp</Button>{/snippet}

{#snippet Variants()}
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Teritiary</Button>
{/snippet}

{#snippet RenderColors()}
  {#each [...themeColors, 'danger'] as color (color)}
    <Button data-color={color} variant="primary">{color}</Button>
  {/each}
{/snippet}

<!-- ColorsHover and ColorsPressed differ from Colors only by Storybook's pseudo-state parameter. -->
{#snippet Colors()}{@render RenderColors()}{/snippet}
{#snippet ColorsHover()}{@render RenderColors()}{/snippet}
{#snippet ColorsPressed()}{@render RenderColors()}{/snippet}

{#snippet Icons()}
  <Button icon aria-label="Rediger"><PencilWritingIcon aria-hidden /></Button>
  <Button><PencilWritingIcon aria-hidden /> Rediger</Button>
{/snippet}

{#snippet CombinedColors()}
  <Button variant="primary" data-color="neutral">Publiser</Button>
  <Button variant="secondary" data-color="neutral">Lagre kladd</Button>
  <Button variant="tertiary" data-color="danger">Slett</Button>
{/snippet}

{#snippet AsLink()}
  <Button>
    {#snippet child({ props })}
      <a target="_blank" rel="noreferrer" href="https://www.designsystemet.no" {...props}>Gå til designsystemet.no</a>
    {/snippet}
  </Button>
{/snippet}

{#snippet Loading()}
  <Button variant="primary" loading>Laster...</Button>
  <Button variant="secondary" loading>Laster...</Button>
  <Button variant="tertiary" loading>Laster...</Button>
  <!-- When loading is true and icon is set, loading will take precedence -->
  <Button icon loading aria-label="Rediger"><PencilWritingIcon aria-hidden /></Button>
{/snippet}
