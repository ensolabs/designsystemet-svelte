<!--
  Validation text under a field. Inside a Field, designsystemet-web links it to the input. The children can also be
  given as text or a snippet in a `children` prop, as `validationMessageProps` from useCheckboxGroup and useRadioGroup
  do.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import Content from '../content.svelte';
  import type { ChildSnippet, Content as ContentType, DefaultProps } from '../types';

  type Props = DefaultProps & Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & { children?: ContentType; child?: ChildSnippet; ref?: HTMLParagraphElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-validation-message', className], 'data-field': 'validation', ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <p bind:this={ref} {...attrs}><Content content={children} /></p>
{/if}
