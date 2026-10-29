<!-- BookIcon from @navikt/aksel-icons, as its React component renders it. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId: ownTitleId, ...props }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const titleId = $derived(title ? (ownTitleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={titleId} {...props}>{#if title}<title id={titleId}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H9A.75.75 0 0 1 8.25 9zm1.5.75v1.5h4.5v-1.5z" clip-rule="evenodd"></path><path fill="currentColor" fill-rule="evenodd" d="M7 2.25A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h12a.75.75 0 0 0 .67-1.085l-.105-.212a3.25 3.25 0 0 1 0-2.906l.106-.212a.75.75 0 0 0 .079-.334V3.5c0-.69-.56-1.25-1.25-1.25zm11.25 1.5H7c-.69 0-1.25.56-1.25 1.25v11.55c.375-.192.8-.3 1.25-.3h11.25zm-.36 16.5a4.75 4.75 0 0 1 0-2.5H7a1.25 1.25 0 1 0 0 2.5z" clip-rule="evenodd"></path></svg>
