<!-- Svelte twins of packages/react/src/components/textarea/textarea.stories.tsx. -->
<script module lang="ts">
  import { Label, Textarea } from '../../../src';
  import Controlled_ from './textarea/Controlled.svelte';
  import Decorator from './textarea/Decorator.svelte';

  export { Controlled, FullWidth, Preview };
</script>

{#snippet Preview()}
  <Decorator>
    <Label for="my-textarea">Label</Label>
    <Textarea disabled={false} readonly={false} cols={40} id="my-textarea" />
  </Decorator>
{/snippet}

{#snippet FullWidth()}
  <Decorator padded>
    <Label for="my-textarea">Label</Label>
    <Textarea cols={40} id="my-textarea" />
  </Decorator>
{/snippet}

{#snippet Controlled()}
  <Decorator><Controlled_ /></Decorator>
{/snippet}
