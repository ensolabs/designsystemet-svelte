<!-- The TestSync story: a button adds boxes, each joining the others' animation. -->
<script lang="ts">
  import { Button } from '../../../../src';
  import SyncedBox from './SyncedBox.svelte';

  let count = $state(1);
</script>

<Button onclick={() => count++}>Ny boks</Button>
<div style="display: flex; gap: 10px; max-width: 300px; flex-wrap: wrap">
  {#each { length: count }, i (i)}
    <SyncedBox />
  {/each}
</div>

<!-- A <style> in a block is rendered as-is, like the story's <style> element, rather than scoped to the component. -->
{#if true}
  <style>
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
{/if}
