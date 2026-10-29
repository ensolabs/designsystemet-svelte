<!-- A Popover for the controlled-state tests: uncontrolled, controlled by `open` (with a parent that follows onOpen and
     onClose or not), or bound with bind:open; with a trigger and something outside. The state goes to an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Popover } from '../../../src/popover';

  type Props = { open?: boolean; follow?: boolean; bind?: boolean; onOpen?: () => void; onClose?: () => void };
  let { open: initial, follow = false, bind = false, onOpen, onClose }: Props = $props();

  let open = $state(untrack(() => initial));
</script>

<div class="story">
  <Popover.TriggerContext>
    <Popover.Trigger>Åpne</Popover.Trigger>
    {#if bind}
      <Popover bind:open {onOpen} {onClose}>Innhold</Popover>
    {:else}
      <Popover
        {open}
        onOpen={() => {
          onOpen?.();
          if (follow) open = true;
        }}
        onClose={() => {
          onClose?.();
          if (follow) open = false;
        }}>Innhold</Popover
      >
    {/if}
  </Popover.TriggerContext>
  <p>Utenfor</p>
</div>
<output>{JSON.stringify(open ?? null)}</output>
