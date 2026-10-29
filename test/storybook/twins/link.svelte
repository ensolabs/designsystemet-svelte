<!-- Svelte twins of packages/react/src/components/link/link.stories.tsx. -->
<script module lang="ts">
  import { Link, Paragraph } from '../../../src';
  import BookIcon from './icons/BookIcon.svelte';
  import ComponentIcon from './icons/ComponentIcon.svelte';
  import EnvelopeClosedIcon from './icons/EnvelopeClosedIcon.svelte';
  import ExternalLinkIcon from './icons/ExternalLinkIcon.svelte';

  const randomNum = Math.floor(Math.random() * 1000);
  const designsystemetLink = 'https://designsystemet.no/?=' + randomNum;

  export { Normal, InText, WithIcon, WithIconRight, WithMultipleIcons, WithOnlyIcon, LongLink, Neutral, AsButton };
</script>

{#snippet Normal()}<Link href={designsystemetLink}>Gå til designsystemet</Link>{/snippet}

{#snippet InText()}
  <Paragraph>
    Vi bruker komponenter fra{' '}
    <Link href={designsystemetLink}>designsystemet.no</Link>
    .
  </Paragraph>
{/snippet}

<!-- The meta's `href` arg comes after the story's own, so it wins. -->
{#snippet WithIcon()}
  <!-- No whitespace between the icons and the text: JSX leaves none, and inside the link it would show. -->
  <Link href={designsystemetLink}
    ><EnvelopeClosedIcon aria-hidden height="1.5rem" width="1.5rem" /><span>Kontakt oss</span></Link
  >
{/snippet}

{#snippet WithIconRight()}
  <Link href={designsystemetLink}
    ><span>Kontakt oss</span><EnvelopeClosedIcon aria-hidden height="1.5rem" width="1.5rem" /></Link
  >
{/snippet}

{#snippet WithMultipleIcons()}
  <Link href={designsystemetLink}
    ><ComponentIcon aria-hidden height="1.5rem" width="1.5rem" /><span>Komponenter og</span><BookIcon
      aria-hidden
      height="1.5rem"
      width="1.5rem"
    /><span>dokumentasjon på designsystemet.no</span><ExternalLinkIcon aria-hidden height="1.5rem" width="1.5rem" /></Link
  >
{/snippet}

{#snippet WithOnlyIcon()}
  <Link href={designsystemetLink}>
    <ComponentIcon title="Designsystemet" height="1.5rem" width="1.5rem" />
  </Link>
{/snippet}

{#snippet LongLink()}
  <Paragraph>
    <Link href={designsystemetLink}>Dette er en lenke som brekker over flere linjer</Link>
  </Paragraph>
{/snippet}

{#snippet Neutral()}<Link href={designsystemetLink} data-color="neutral">Gå til designsystemet</Link>{/snippet}

{#snippet AsButton()}
  <Link href={designsystemetLink}>
    {#snippet child({ props })}<button type="button" {...props}>Gå til designsystemet</button>{/snippet}
  </Link>
{/snippet}
