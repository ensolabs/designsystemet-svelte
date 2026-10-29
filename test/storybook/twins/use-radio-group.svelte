<!-- Svelte twins of packages/react/src/utilities/hooks/use-radio-group/use-radio-group.stories.tsx. Svelte has no
     useRadioGroup: the radios bind to one value with bind:group and share a name, which is what the hook's
     getRadioProps does. -->
<script module lang="ts">
  import Conditional from './use-radio-group/Conditional.svelte';
  import Controlled from './use-radio-group/Controlled.svelte';
  import PizzaGroup from './use-radio-group/PizzaGroup.svelte';

  export { Preview, ControlledStory as Controlled, ConditionalStory as Conditional };
</script>

{#snippet Preview()}<PizzaGroup />{/snippet}

{#snippet ControlledStory()}<Controlled />{/snippet}

{#snippet ConditionalStory()}<Conditional />{/snippet}
