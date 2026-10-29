<!-- The WithDynamicCSSTooltipText story: the tooltip text read from a CSS variable on the button. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, Tooltip } from '../../../../src';
  import FilesIcon from '../icons/FilesIcon.svelte';

  let tooltip = $state<HTMLElement>();
  let tooltipContent = $state('');

  // Tooltip text from css variable
  onMount(() => {
    if (!tooltip) return;
    tooltipContent = getComputedStyle(tooltip)
      .getPropertyValue('--ds-tooltip-content')
      .replace(/^["']|["']$/g, '')
      .trim();
  });
</script>

<Tooltip content={tooltipContent} bind:ref={tooltip}>
  {#snippet child({ props })}
    <Button style={'--ds-tooltip-content: "Kopier"'} {...props}><FilesIcon aria-hidden /></Button>
  {/snippet}
</Tooltip>
