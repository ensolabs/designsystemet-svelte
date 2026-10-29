<!-- Svelte twins of packages/react/src/components/popover/popover.stories.tsx. -->
<script module lang="ts">
  import { Button, Paragraph, Popover } from '../../../src';
  import TrashIcon from './icons/TrashIcon.svelte';
  import ControlledStory from './popover/Controlled.svelte';
  import VariantsStory from './popover/Variants.svelte';
  import WithoutContextStory from './popover/WithoutContext.svelte';

  export { Preview, Interactive, DottedUnderline, Variants, Controlled, WithoutContext };
</script>

{#snippet Preview()}
  <Popover.TriggerContext>
    <Popover.Trigger>Mine varsler</Popover.Trigger>
    <Popover placement="top">Du har ingen varsler</Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet Interactive()}
  <Popover.TriggerContext>
    <Popover.Trigger data-color="danger" aria-label="Slett rad"><TrashIcon title="Slett rad" /></Popover.Trigger>
    <Popover data-color="danger">
      <Paragraph>Er du sikker på at du vil slette raden? Handlingen kan ikke angres.</Paragraph>
      <div style="display: flex; gap: var(--ds-size-2); margin-top: var(--ds-size-2)">
        <Button data-size="sm">Ja, slett den</Button>
        <Button data-size="sm" variant="tertiary">Avbryt</Button>
      </div>
    </Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet DottedUnderline()}
  <Popover.TriggerContext>
    <Paragraph>
      Vi bruker <Popover.Trigger inline>design tokens</Popover.Trigger> for å sikre at vi har en konsistent design.
    </Paragraph>
    <Popover data-color="neutral">
      <Paragraph>
        <strong style="display: block">Design tokens</strong>
        Design tokens er en samling av variabler som definerer designet i et designsystem.
      </Paragraph>
    </Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet Variants()}<VariantsStory />{/snippet}

{#snippet Controlled()}<ControlledStory />{/snippet}

{#snippet WithoutContext()}<WithoutContextStory />{/snippet}
