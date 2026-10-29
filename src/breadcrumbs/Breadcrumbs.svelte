<!--
  Shows where the page is in the site: Breadcrumbs.List of Breadcrumbs.Item with Breadcrumbs.Link, and optionally a
  Breadcrumbs.Link straight inside for the back link small screens show. designsystemet-web's `<ds-breadcrumbs>`
  picks which to show; give it an `aria-label`.
-->
<script lang="ts">
  import { customElementAttributes } from '../utilities/custom-element';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLElement> & { 'aria-label'?: string; ref?: HTMLElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-breadcrumbs', className], ...rest });
</script>

<ds-breadcrumbs bind:this={ref} {...customElementAttributes(attrs)}>{@render children?.()}</ds-breadcrumbs>
