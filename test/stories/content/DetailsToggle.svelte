<!-- A Details for the toggle tests: uncontrolled (with or without defaultOpen), controlled by `open` (with a parent that
     follows onToggle or not), or bound with bind:open. The toggles go to `onToggle`, the state to an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Details } from '../../../src/details';

  type Props = { open?: boolean; defaultOpen?: boolean; follow?: boolean; bind?: boolean; onToggle?: () => void };
  let { open: initial, defaultOpen, follow = false, bind = false, onToggle }: Props = $props();

  let open = $state(untrack(() => initial));
</script>

<div class="story">
  {#if bind}
    <Details bind:open {defaultOpen} {onToggle}>
      <Details.Summary>Mer</Details.Summary>
      <Details.Content>Innhold</Details.Content>
    </Details>
  {:else}
    <Details
      {open}
      {defaultOpen}
      onToggle={() => {
        onToggle?.();
        if (follow) open = !open;
      }}
    >
      <Details.Summary>Mer</Details.Summary>
      <Details.Content>Innhold</Details.Content>
    </Details>
  {/if}
</div>
<output>{JSON.stringify(open ?? null)}</output>
