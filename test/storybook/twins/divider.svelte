<!-- Svelte twins of packages/react/src/components/divider/divider.stories.tsx. -->
<script module lang="ts">
  import { Divider, Paragraph } from '../../../src';

  export { Preview };
</script>

{#snippet Preview()}
  <Paragraph>Divider er brukt for å dele opp innhold i mindre deler.</Paragraph>
  <Divider />
  <Paragraph>Den kan også brukes for å skille innhold som er relatert til hverandre.</Paragraph>
{/snippet}
