<!-- Svelte twins of packages/react/src/components/spinner/spinner.stories.tsx. -->
<script module lang="ts">
  import { Spinner } from '../../../src';
  import { severityColors, themeColors } from './constants/colors';

  export { Preview, Variants, Sizes };
</script>

{#snippet Preview()}<Spinner aria-label="Henter kaffi" />{/snippet}

{#snippet Variants()}
  {#each [...themeColors, ...severityColors] as color (color)}
    <Spinner aria-label={`Henter ${color} kaffi`} data-color={color} data-size="xl" />
  {/each}
{/snippet}

{#snippet Sizes()}
  {#each ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const as size (size)}
    <Spinner aria-label="Henter kaffi" data-size={size} />
  {/each}
{/snippet}
