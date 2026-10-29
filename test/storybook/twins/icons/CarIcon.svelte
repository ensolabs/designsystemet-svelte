<!-- CarIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M5.8 6.35A2.75 2.75 0 0 1 8 5.25h5c.866 0 1.68.408 2.2 1.1l2.268 3.025 3.146 1.18a1.75 1.75 0 0 1 1.136 1.638v1.526a1.75 1.75 0 0 1-1.326 1.698l-.68.17q.006.08.006.163a2.5 2.5 0 0 1-5 0h-5a2.5 2.5 0 0 1-5 0H4A1.75 1.75 0 0 1 2.25 14v-3c0-.825.57-1.516 1.339-1.701zm1.2.9-1.5 2h3.25v-2.5H8a1.25 1.25 0 0 0-1 .5m7 0 1.5 2h-5.25v-2.5H13c.393 0 .764.185 1 .5m6.088 4.709-3.224-1.209H3.996a.25.25 0 0 0-.246.25v3c0 .138.112.25.25.25h1.25c.456-.607 1.182-1 2-1s1.544.393 2 1h6c.456-.607 1.182-1 2-1 .785 0 1.486.362 1.944.928l.867-.216a.25.25 0 0 0 .189-.243v-1.526a.25.25 0 0 0-.162-.234M6.25 15.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0m10 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0" clip-rule="evenodd" /></svg
>
