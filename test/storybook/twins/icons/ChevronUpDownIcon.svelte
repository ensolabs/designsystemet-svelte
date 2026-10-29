<!-- ChevronUpDownIcon from @navikt/aksel-icons, as its React component renders it. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId: ownTitleId, ...props }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const titleId = $derived(title ? (ownTitleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={titleId} {...props}>{#if title}<title id={titleId}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M12.53 4.47a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06L12 6.06l2.97 2.97a.75.75 0 1 0 1.06-1.06zm-3.5 10.5a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 1 0-1.06-1.06L12 17.94z" clip-rule="evenodd"></path></svg>
