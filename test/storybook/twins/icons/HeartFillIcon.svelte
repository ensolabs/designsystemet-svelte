<!-- HeartFillIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" d="M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844" /></svg
>
