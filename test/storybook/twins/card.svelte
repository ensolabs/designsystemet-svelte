<!-- Svelte twins of packages/react/src/components/card/card.stories.tsx. -->
<script module lang="ts">
  import { Card, Heading, Link, Paragraph } from '../../../src';
  import { cat1Img, cat5Img } from './constants/cats.svelte';
  import { severityColors, themeColors } from './constants/colors';

  const variants = ['default', 'tinted'];
  const text =
    'Most provide as with carried business are much better more the perfected designer. Writing slightly explain desk unable at supposedly about this';

  export { Preview, Variants, Media, Video, WithLink, AsLink, AsButton, AsGrid };
</script>

{#snippet Preview()}
  <Card data-color="neutral" style="max-width: 320px">
    <Heading>Card</Heading>
    <Paragraph>{text}</Paragraph>
    <Paragraph data-size="sm">Footer text</Paragraph>
  </Card>
{/snippet}

{#snippet Variants()}
  {#each variants as variant (variant)}
    {#each [...themeColors, ...severityColors] as color (`${variant}-${color}`)}
      <Card data-variant={variant} data-color={color}>
        <Card.Block>
          <Paragraph>{variant}: {color}</Paragraph>
        </Card.Block>
      </Card>
    {/each}
  {/each}
{/snippet}

{#snippet video()}
  <iframe
    data-chromatic="ignore"
    src="https://player.vimeo.com/video/863563441?app_id=122963&amp;title=0&amp;byline=0&amp;portrait=0&amp;dnt=1"
    width="320px"
    height="179px"
    allow="autoplay; fullscreen; picture-in-picture"
    title="30 år med digitalt innsyn"
  ></iframe>
{/snippet}

{#snippet Media()}
  <Card data-color="neutral">
    <Card.Block>{@render video()}</Card.Block>
    <Card.Block>
      <Heading>Card Neutral</Heading>
      <Paragraph>{text}</Paragraph>
    </Card.Block>
  </Card>
  <Card data-color="neutral">
    <Card.Block>
      <Heading>Card Neutral</Heading>
      <Paragraph>{text}</Paragraph>
    </Card.Block>
    <Card.Block>{@render cat1Img()}</Card.Block>
  </Card>
{/snippet}

{#snippet Video()}
  <Card data-color="neutral" style="max-width: 320px">
    <Card.Block>{@render video()}</Card.Block>
    <Card.Block>
      <Heading>
        <a href="https://www.digdir.no/felleslosninger/30-ar-med-digitalt-innsyn/5015" target="_blank" rel="noreferrer">
          Vi feira 30 år med digitalt innsyn
        </a>
      </Heading>
      <Paragraph>
        Det er i år 30 år sidan dei første forsøka med elektronisk postjournal i Noreg. Sjå opptak frå feiringa på Pressens
        Hus der det både var historiske tilbakeblikk og debatt om innsyn og openheit i forvaltninga.
      </Paragraph>
    </Card.Block>
  </Card>
{/snippet}

{#snippet WithLink()}
  <Card>
    <Card.Block>{@render cat5Img()}</Card.Block>
    <Card.Block>
      <Heading>
        <a href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">Link Card</a>
      </Heading>
      <Paragraph>{text}</Paragraph>
      <Paragraph data-size="sm">Footer text</Paragraph>
    </Card.Block>
  </Card>
  <Card data-color="neutral">
    <Card.Block>
      <Heading>
        <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">Link Card</Link>
      </Heading>
      <Paragraph>{text}</Paragraph>
      <Paragraph data-size="sm">Footer text</Paragraph>
    </Card.Block>
    <Card.Block>{@render cat5Img()}</Card.Block>
  </Card>
{/snippet}

{#snippet AsLink()}
  <Card>
    {#snippet child({ props })}
      <a href="https://designsystemet.no" target="_blank" rel="noopener noreferrer" {...props}>
        <Card.Block>
          <Paragraph>Link card with asChild</Paragraph>
        </Card.Block>
      </a>
    {/snippet}
  </Card>
  <Card data-color="neutral">
    {#snippet child({ props })}
      <a href="https://designsystemet.no" target="_blank" rel="noopener noreferrer" {...props}>
        <Heading>Link Card with asChild</Heading>
        <Paragraph>Most provide as with carried business are much better more the perfected designer.</Paragraph>
      </a>
    {/snippet}
  </Card>
{/snippet}

{#snippet AsButton()}
  <Card>
    {#snippet child({ props })}
      <button type="button" {...props}>
        <Card.Block>
          <Heading>Button Card with blocks</Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>Most provide as with carried business are much better more the perfected designer.</Paragraph>
        </Card.Block>
      </button>
    {/snippet}
  </Card>
{/snippet}

{#snippet AsGrid()}
  <Card style="display: grid; grid-template-columns: 1fr 1fr">
    <Card.Block>
      <Heading>Button Card with blocks</Heading>
    </Card.Block>
    <Card.Block>
      <Paragraph>Most provide as with carried business are much better more the perfected designer.</Paragraph>
    </Card.Block>
  </Card>
{/snippet}
