<!-- Svelte twins of packages/react/src/components/breadcrumbs/breadcrumbs.stories.tsx. -->
<script module lang="ts">
  import { Breadcrumbs } from '../../../src';

  export { Preview, ListOnly, BackOnly, LongItems, MobileViewport };

  const levels = ['Nivå 1', 'Nivå 2', 'Nivå 3', 'Nivå 4'];
  const longLevels = [
    'Hjem',
    'Eksport til land utenfor EU/EØS',
    'Eksport av mat og drikke',
    'Eksport av fisk og sjømat',
    'Veiledning om helsesertifikat for sjømat',
    'Slik søker du om helsesertifikat for sjømat',
    'Slik søker du om helsesertifikat i ny eksportløsning',
  ];
</script>

{#snippet list(items: string[], label?: string)}
  <Breadcrumbs.List aria-label={label}>
    {#each items as item (item)}
      <Breadcrumbs.Item><Breadcrumbs.Link href="#">{item}</Breadcrumbs.Link></Breadcrumbs.Item>
    {/each}
  </Breadcrumbs.List>
{/snippet}

{#snippet Preview()}
  <Breadcrumbs aria-label="Du er her:">
    <Breadcrumbs.Link href="#" aria-label="Tilbake til Nivå 3">Nivå 3</Breadcrumbs.Link>
    {@render list(levels)}
  </Breadcrumbs>
{/snippet}

{#snippet ListOnly()}
  <Breadcrumbs aria-label="Du er her:">{@render list(levels)}</Breadcrumbs>
{/snippet}

{#snippet BackOnly()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#" aria-label="Tilbake til Nivå 3">Nivå 3</Breadcrumbs.Link>
  </Breadcrumbs>
{/snippet}

{#snippet LongItems()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#" aria-label="Tilbake til helsesertifikat for sjømat">
      Slik søker du om helsesertifikat for sjømat
    </Breadcrumbs.Link>
    {@render list(longLevels, 'Du er her:')}
  </Breadcrumbs>
{/snippet}

<!-- MobileViewport is Preview in a 375px wide Storybook viewport. -->
{#snippet MobileViewport()}{@render Preview()}{/snippet}
