<!-- ParagraphIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M11.997 2.25A3.747 3.747 0 0 0 8.75 7.864a3.292 3.292 0 0 0-.376 6.218l4.486 1.848a2.245 2.245 0 0 1-.857 4.32A2.25 2.25 0 0 1 9.75 18a.75.75 0 0 0-1.5 0 3.75 3.75 0 0 0 3.753 3.75 3.747 3.747 0 0 0 3.247-5.614 3.293 3.293 0 0 0 .376-6.218L11.14 8.07a2.245 2.245 0 0 1 .857-4.32A2.25 2.25 0 0 1 14.25 6a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.753-3.75m1.2 12.196.057.018.511.184a1.793 1.793 0 0 0 1.29-3.344l-4.251-1.75-.058-.018-.51-.184a1.793 1.793 0 0 0-1.29 3.344z" clip-rule="evenodd" /></svg
>
