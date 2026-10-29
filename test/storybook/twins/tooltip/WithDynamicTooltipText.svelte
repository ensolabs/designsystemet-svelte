<!-- The WithDynamicTooltipText story: the tooltip says "Kopiert" after a click, until the button loses focus. -->
<script lang="ts">
  import { Button, Tooltip } from '../../../../src';
  import FilesIcon from '../icons/FilesIcon.svelte';

  let content = $state('Kopier');
</script>

<Tooltip {content}>
  {#snippet child({ props })}
    <Button icon onclick={() => (content = 'Kopiert')} onblur={() => (content = 'Kopier')} {...props}>
      <FilesIcon aria-hidden />
    </Button>
  {/snippet}
</Tooltip>
