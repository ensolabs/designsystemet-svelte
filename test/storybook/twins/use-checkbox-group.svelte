<!-- Svelte twins of packages/react/src/utilities/hooks/use-checkbox-group/use-checkbox-group.stories.tsx. Svelte has no
     useCheckboxGroup: the checkboxes bind to one array with bind:group, and the group's name and error are passed to
     each, which is what the hook's getCheckboxProps does. -->
<script module lang="ts">
  import ContactGroup from './checkbox/ContactGroup.svelte';
  import AllowIndeterminate from './use-checkbox-group/AllowIndeterminate.svelte';

  export { Default, AllowIndeterminateStory as AllowIndeterminate };
</script>

{#snippet Default()}<ContactGroup legend={false} />{/snippet}

{#snippet AllowIndeterminateStory()}<AllowIndeterminate />{/snippet}
