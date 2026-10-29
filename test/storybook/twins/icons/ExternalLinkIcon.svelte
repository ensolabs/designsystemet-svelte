<!-- ExternalLinkIcon from @navikt/aksel-icons, as its React component renders it. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId: ownTitleId, ...props }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const titleId = $derived(title ? (ownTitleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={titleId} {...props}>{#if title}<title id={titleId}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M20.532 3.471A.75.75 0 0 1 20.75 4v7.5a.75.75 0 0 1-1.5 0V5.81l-8.72 8.72a.75.75 0 1 1-1.06-1.06l8.72-8.72H12.5a.75.75 0 0 1 0-1.5H20c.206 0 .393.083.529.218l.001.002zM4.75 9A.25.25 0 0 1 5 8.75h7a.75.75 0 0 0 0-1.5H5A1.75 1.75 0 0 0 3.25 9v10c0 .966.784 1.75 1.75 1.75h10A1.75 1.75 0 0 0 16.75 19v-7a.75.75 0 0 0-1.5 0v7a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25z" clip-rule="evenodd"></path></svg>
