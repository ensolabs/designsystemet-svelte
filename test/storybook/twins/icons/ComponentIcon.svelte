<!-- ComponentIcon from @navikt/aksel-icons, as its React component renders it. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId: ownTitleId, ...props }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const titleId = $derived(title ? (ownTitleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={titleId} {...props}>{#if title}<title id={titleId}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M12.53 2.47a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 0 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0 0-1.06zM12 8.94 9.56 6.5 12 4.06l2.44 2.44zm6.03-.97a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 0 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0 0-1.06zm-.53 6.47L15.06 12l2.44-2.44L19.94 12zM5.97 7.97a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 0-1.06zM4.06 12l2.44 2.44L8.94 12 6.5 9.56zm8.47 1.47a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 0 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0 0-1.06zM12 19.94 9.56 17.5 12 15.06l2.439 2.44z" clip-rule="evenodd"></path></svg>
