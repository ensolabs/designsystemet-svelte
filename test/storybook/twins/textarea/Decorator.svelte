<!-- The textarea stories' decorator: a column, 20rem wide unless the story's layout is padded. -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { padded = false, children }: { padded?: boolean; children: Snippet } = $props();
</script>

<div id="story-render" style:display="flex" style:flex-direction="column" style:gap="var(--ds-size-2)" style:max-width="100%" style:width={padded ? undefined : '20rem'}>
  <style>#storybook-root{max-width:100vw}</style>
  {@render children()}
</div>
