<!-- ChatIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M6 4.75c-.69 0-1.25.56-1.25 1.25v12.675l3.864-2.318A.75.75 0 0 1 9 16.25h9c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25zM3.25 6A2.75 2.75 0 0 1 6 3.25h12A2.75 2.75 0 0 1 20.75 6v9A2.75 2.75 0 0 1 18 17.75H9.208l-4.822 2.893A.75.75 0 0 1 3.25 20z" clip-rule="evenodd" /></svg
>
