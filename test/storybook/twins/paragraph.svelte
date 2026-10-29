<!-- Svelte twins of packages/react/src/components/paragraph/paragraph.stories.tsx. -->
<script module lang="ts">
  import { Paragraph } from '../../../src';

  export { Preview };
</script>

{#snippet Preview()}
  <Paragraph variant="default">
    Personvernerklæringen gir informasjon om hvilke personopplysninger vi behandler, hvordan disse blir behandlet og
    hvilke rettigheter du har.
  </Paragraph>
{/snippet}
