<!-- The Variants story: every colour and variant, opened once mounted. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Popover } from '../../../../src';

  const VariantsMap: Record<string, { 'data-color': string; variant?: 'tinted' }> = {
    neutralDefault: { 'data-color': 'neutral' },
    neutralTinted: { 'data-color': 'neutral', variant: 'tinted' },
    dangerDefault: { 'data-color': 'danger' },
    dangerTinted: { 'data-color': 'danger', variant: 'tinted' },
    infoDefault: { 'data-color': 'info' },
    infoTinted: { 'data-color': 'info', variant: 'tinted' },
    warningDefault: { 'data-color': 'warning' },
    warningTinted: { 'data-color': 'warning', variant: 'tinted' },
  };

  let open = $state(false);

  onMount(() => (open = true));
</script>

{#each Object.entries(VariantsMap) as [key, props], index (key)}
  <Popover.TriggerContext>
    <Popover.Trigger>popover</Popover.Trigger>
    <Popover {open} placement={index >= 4 ? 'bottom' : 'top'} autoPlacement={false} {...props}>{key}</Popover>
  </Popover.TriggerContext>
{/each}
