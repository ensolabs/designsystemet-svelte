<!-- Svelte twins of packages/react/src/components/skeleton/skeleton.stories.tsx. -->
<script module lang="ts">
  import { Button, Heading, Paragraph, Skeleton } from '../../../src';

  export { Preview, Components, UsageExample, Children, Text };
</script>

{#snippet Preview()}<Skeleton width={200} height={100} />{/snippet}

{#snippet Components()}
  <Skeleton variant="circle" width="50px" height="50px" />
  <Skeleton variant="rectangle" width="100px" height="50px" />
  <Paragraph>
    <Skeleton variant="text" width="10" />
  </Paragraph>
{/snippet}

{#snippet UsageExample()}
  <Skeleton height="150px" />
  <div style="display: flex; gap: 10px; align-items: center; padding: 5px 0 5px 0">
    <Skeleton variant="circle" width="30px" height="30px" />
    <Heading>
      <Skeleton variant="text">En medium tittel</Skeleton>
    </Heading>
  </div>
  <Skeleton variant="text" width="140" />
{/snippet}

{#snippet Children()}
  <Skeleton variant="rectangle">
    <Paragraph>Her er en tekst som blir sendt inn som barn av en Skeleton.</Paragraph>
    <Paragraph>Se hvordan Skeleton da dekker den samlede bredden og høyden til barna.</Paragraph>
    <Button>Knapp</Button>
  </Skeleton>
{/snippet}

{#snippet Text()}
  <div style="flex: 1 1 200px">
    <Heading>En tittel</Heading>
    <Paragraph data-size="sm">Her er en paragraf som går over flere linjer</Paragraph>
  </div>
  <div style="flex: 1 1 200px">
    <Heading>
      <Skeleton variant="text">En tittel</Skeleton>
    </Heading>
    <Paragraph data-size="sm">
      <Skeleton variant="text" width={40} />
    </Paragraph>
  </div>
{/snippet}
