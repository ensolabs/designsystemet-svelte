<!-- Svelte twins of packages/react/src/components/badge/badge.stories.tsx. -->
<script module lang="ts">
  import { Badge, Button, Paragraph, Tabs } from '../../../src';
  import ChatIcon from './icons/ChatIcon.svelte';
  import EnvelopeClosedFillIcon from './icons/EnvelopeClosedFillIcon.svelte';
  import HeartFillIcon from './icons/HeartFillIcon.svelte';
  import InboxIcon from './icons/InboxIcon.svelte';
  import PencilIcon from './icons/PencilIcon.svelte';
  import VideoFillIcon from './icons/VideoFillIcon.svelte';
  import VideoIcon from './icons/VideoIcon.svelte';

  export { Preview, Floating, CustomPlacement, Status, InTabs, InButton, Variants, Bullet };

  const placements = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

  const variants: Record<string, { 'data-color': string; variant?: 'tinted' }> = {
    neutralBase: { 'data-color': 'neutral' },
    neutralTinted: { 'data-color': 'neutral', variant: 'tinted' },
    dangerBase: { 'data-color': 'danger' },
    dangerTinted: { 'data-color': 'danger', variant: 'tinted' },
    infoBase: { 'data-color': 'info' },
    infoTinted: { 'data-color': 'info', variant: 'tinted' },
    warningBase: { 'data-color': 'warning' },
    warningTinted: { 'data-color': 'warning', variant: 'tinted' },
  };
</script>

{#snippet Preview()}<Badge count={15} maxCount={9} />{/snippet}

{#snippet Floating()}
  {#each placements as placement (placement)}
    <Badge.Position {placement}>
      <Badge data-color="accent" />
      <EnvelopeClosedFillIcon title="Meldinger" />
    </Badge.Position>
  {/each}
  {#each placements as placement (placement)}
    <Badge.Position {placement} overlap="circle">
      <Badge data-color="accent" />
      <div
        style="width: 2rem; height: 2rem; border-radius: 50%; background-color: var(--ds-color-brand2-base-default)"
      ></div>
    </Badge.Position>
  {/each}
{/snippet}

{#snippet CustomPlacement()}
  <Badge.Position placement="top-right" style="--dsc-badge-top: 16%; --dsc-badge-right: 10%">
    <Badge data-color="accent" />
    <EnvelopeClosedFillIcon title="Meldinger" />
  </Badge.Position>
{/snippet}

{#snippet Status()}
  {#each ['sm', 'md', 'lg'] as size (size)}
    <Badge.Position data-size={size}>
      <Badge data-color="danger" />
      <VideoFillIcon title="Videokamera" />
    </Badge.Position>
  {/each}
{/snippet}

{#snippet InTabs()}
  <Tabs defaultValue="value1">
    <Tabs.List>
      <Tabs.Tab value="value1">
        <HeartFillIcon aria-hidden={true} />
        Favoritter
        <Badge count={64} maxCount={10} data-color="neutral" />
      </Tabs.Tab>
      <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
      <Tabs.Tab value="value3">
        <PencilIcon aria-hidden={true} />
        Nylige
        <Badge count={2} data-color="neutral" />
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="value1">content 1</Tabs.Panel>
    <Tabs.Panel value="value2">content 2</Tabs.Panel>
    <Tabs.Panel value="value3">content 3</Tabs.Panel>
  </Tabs>
{/snippet}

{#snippet InButton()}
  <Button icon variant="tertiary">
    <Badge.Position>
      <Badge data-color="danger" count={1000} maxCount={99} />
      <InboxIcon title="Innboks" />
    </Badge.Position>
  </Button>
  <Button icon variant="tertiary">
    <Badge.Position>
      <Badge data-color="danger" count={10} />
      <ChatIcon title="Meldinger" />
    </Badge.Position>
  </Button>
  <Button icon variant="tertiary">
    <Badge.Position>
      <Badge data-color="danger" />
      <VideoIcon title="Skru på video" />
    </Badge.Position>
  </Button>
  <Badge.Position>
    <Badge data-color="danger" count={10} />
    <Button><InboxIcon title="Innboks" /> Test</Button>
  </Badge.Position>
{/snippet}

{#snippet Variants()}
  {#each Object.entries(variants) as [key, props] (key)}
    <Badge {...props} count={15} maxCount={9} />
  {/each}
{/snippet}

{#snippet Bullet()}
  <Paragraph><Badge data-color="success" /> Aktiv</Paragraph>
{/snippet}
