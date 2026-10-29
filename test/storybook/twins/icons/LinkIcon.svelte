<!-- LinkIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M14.909 5.152a2.25 2.25 0 0 1 3.182 0l.757.757a2.25 2.25 0 0 1 0 3.182l-4.964 4.965a1.25 1.25 0 0 1-1.768 0L11.03 12.97a.75.75 0 1 0-1.06 1.06l1.085 1.086a2.75 2.75 0 0 0 3.89 0l4.964-4.964a3.75 3.75 0 0 0 0-5.304l-.757-.757-.53.53.53-.53a3.75 3.75 0 0 0-5.304 0l-.878.879a.75.75 0 0 0 1.06 1.06zm-1.964 3.732a2.75 2.75 0 0 0-3.89 0l-4.964 4.964a3.75 3.75 0 0 0 0 5.304l.513-.514-.513.514.757.757a3.75 3.75 0 0 0 5.304 0l.878-.879a.75.75 0 0 0-1.06-1.06l-.879.878a2.25 2.25 0 0 1-3.182 0l-.757-.757a2.25 2.25 0 0 1 0-3.182l4.964-4.965a1.25 1.25 0 0 1 1.768 0l1.086 1.086a.75.75 0 0 0 1.06-1.06z" clip-rule="evenodd" /></svg
>
