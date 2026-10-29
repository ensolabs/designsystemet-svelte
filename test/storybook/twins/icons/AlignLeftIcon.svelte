<!-- AlignLeftIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M4 3.25a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-1.5 0V4A.75.75 0 0 1 4 3.25M6.25 6A.75.75 0 0 1 7 5.25h13a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75zm1.5.75v2.5h11.5v-2.5zM7 13.25a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75h7a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 0-.75-.75zm.75 4v-2.5h5.5v2.5z" clip-rule="evenodd" /></svg
>
