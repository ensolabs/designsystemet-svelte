<!-- ArchiveIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M3.25 4A.75.75 0 0 1 4 3.25h16a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-.25V19A1.75 1.75 0 0 1 18 20.75H6A1.75 1.75 0 0 1 4.25 19V8.75H4A.75.75 0 0 1 3.25 8zm2.5 4.75h12.5V19a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.25-.25zm-1-4v2.5h14.5v-2.5zm9.25 8.5a.75.75 0 0 0 0-1.5h-4a.75.75 0 0 0 0 1.5z" clip-rule="evenodd" /></svg
>
