<!-- Svelte twins of packages/react/src/components/tag/tag.stories.tsx. -->
<script module lang="ts">
  import { Tag } from '../../../src';
  import ParagraphIcon from './icons/ParagraphIcon.svelte';
  import RobotIcon from './icons/RobotIcon.svelte';
  import { severityColors, themeColors } from './constants/colors';

  export { Preview, Sizes, Colors, Icons, VariantOutline, AsButtonAndLink };
</script>

{#snippet Preview()}<Tag variant="default">New</Tag>{/snippet}

{#snippet Sizes()}
  {#each ['sm', 'md', 'lg'] as const as size (size)}<Tag data-size={size}>{size}</Tag>{/each}
{/snippet}

{#snippet Colors()}
  {#each [...themeColors, ...severityColors] as color (color)}<Tag data-color={color}>{color}</Tag>{/each}
{/snippet}

{#snippet Icons()}
  <Tag data-color="neutral" data-size="md" style="padding-inline-start: var(--ds-size-1)">
    <RobotIcon aria-hidden={true} style="margin-inline-end: var(--ds-size-1)" />
    Teksten er KI-generert
  </Tag>
  <Tag data-color="info" data-size="md" style="padding-inline-start: var(--ds-size-1)">
    <ParagraphIcon aria-hidden={true} style="margin-inline-end: var(--ds-size-1)" />
    Forvaltningsloven §1
  </Tag>
{/snippet}

{#snippet VariantOutline()}
  {#each themeColors as color (color)}<Tag data-color={color} variant="outline">{color}</Tag>{/each}
{/snippet}

{#snippet AsButtonAndLink()}
  <Tag>
    {#snippet child({ props })}<button type="button" {...props}>Button</button>{/snippet}
  </Tag>
  <Tag>
    {#snippet child({ props })}<a href="#none" {...props}>Link</a>{/snippet}
  </Tag>
{/snippet}
