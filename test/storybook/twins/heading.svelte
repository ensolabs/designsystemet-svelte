<!-- Svelte twins of packages/react/src/components/heading/heading.stories.tsx. -->
<script module lang="ts">
  import { Heading } from '../../../src';
  import Headings from './heading/Headings.svelte';

  export { Preview, HeadingsInVariousSizes, NestedSizeModes };
</script>

{#snippet Preview()}<Heading>Tittel tekst</Heading>{/snippet}

{#snippet HeadingsInVariousSizes()}
  <div style="display: flex; flex-direction: column; gap: var(--ds-size-6); white-space: nowrap">
    <div data-size="sm" data-testid="small">
      <div>Size mode small</div>
      <Headings />
    </div>
    <div style="display: flex; gap: var(--ds-size-3)">
      <div data-testid="implicit-medium">
        Implicit size mode medium
        <Headings />
      </div>
      <div data-size="md" data-testid="medium">
        Explicit size mode medium
        <Headings />
      </div>
    </div>
    <div data-size="lg" data-testid="large">
      Size mode large
      <Headings />
    </div>
  </div>
{/snippet}

{#snippet nested(path: string[], label: string, testid: string)}
  {#if path.length === 1}
    <div data-size={path[0]} data-testid={testid}>
      {label}
      <Headings />
    </div>
  {:else}
    <div data-size={path[0]}>{@render nested(path.slice(1), label, testid)}</div>
  {/if}
{/snippet}

{#snippet NestedSizeModes()}
  {@const rows = [
    {
      testid: 'small',
      modes: [
        { path: ['sm'], label: 'Small', testid: 'sm' },
        { path: ['md', 'sm'], label: 'Medium › Small', testid: 'md-sm' },
        { path: ['lg', 'sm'], label: 'Large › Small', testid: 'lg-sm' },
        { path: ['lg', 'md', 'sm'], label: 'Large › Medium › Small', testid: 'lg-md-sm' },
        { path: ['md', 'lg', 'sm'], label: 'Medium › Large › Small', testid: 'md-lg-sm' },
      ],
    },
    {
      testid: 'medium',
      modes: [
        { path: ['md'], label: 'Medium', testid: 'md' },
        { path: ['sm', 'md'], label: 'Small › Medium', testid: 'sm-md' },
        { path: ['lg', 'md'], label: 'Large › Medium', testid: 'lg-md' },
        { path: ['lg', 'sm', 'md'], label: 'Large › Small › Medium', testid: 'lg-sm-md' },
        { path: ['sm', 'lg', 'md'], label: 'Small › Large › Medium', testid: 'sm-lg-md' },
      ],
    },
    {
      testid: 'large',
      modes: [
        { path: ['lg'], label: 'Large', testid: 'lg' },
        { path: ['sm', 'lg'], label: 'Small › Large', testid: 'sm-lg' },
        { path: ['md', 'lg'], label: 'Medium › Large', testid: 'md-lg' },
        { path: ['sm', 'md', 'lg'], label: 'Small › Medium › Large', testid: 'sm-md-lg' },
        { path: ['md', 'sm', 'lg'], label: 'Small › Large › Medium', testid: 'md-sm-lg' },
      ],
    },
  ]}
  <div style="display: flex; flex-direction: column; gap: var(--ds-size-6); white-space: nowrap">
    {#each rows as row (row.testid)}
      <div style="display: flex; gap: var(--ds-size-3)" data-testid={row.testid}>
        {#each row.modes as mode (mode.testid)}
          {@render nested(mode.path, mode.label, mode.testid)}
        {/each}
      </div>
    {/each}
  </div>
{/snippet}
