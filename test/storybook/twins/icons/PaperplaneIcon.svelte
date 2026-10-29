<!-- PaperplaneIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd" /></svg
>
