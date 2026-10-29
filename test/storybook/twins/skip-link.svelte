<!-- Svelte twins of packages/react/src/components/skip-link/skip-link.stories.tsx. -->
<script module lang="ts">
  import { Paragraph, SkipLink } from '../../../src';

  export { Preview, Tabbed };
</script>

{#snippet Preview()}
  <Paragraph>
    For å vise skiplinken, tab til dette eksempelet, eller klikk inni eksempelet og trykk <kbd>Tab</kbd>.
    <SkipLink href="#main-content">Hopp til hovedinnhold</SkipLink>
  </Paragraph>
  <main id="main-content" tabindex="-1">Region som kan motta fokus fra skiplink.</main>
{/snippet}

{#snippet Tabbed()}
  <div>
    For å vise skiplinken, tab til dette eksempelet, eller klikk inni eksempelet og trykk <kbd>Tab</kbd>.
    <SkipLink href="#main-content">Hopp til hovedinnhold</SkipLink>
    <main id="main-content" tabindex="-1">Region som kan motta fokus fra skiplink.</main>
  </div>
{/snippet}
