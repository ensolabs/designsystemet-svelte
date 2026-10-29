<!-- PencilWritingIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M14.97 4.47a3.2 3.2 0 0 1 4.562.001c1.26 1.27 1.268 3.368-.002 4.637l-8.5 8.5a.75.75 0 0 1-.38.204l-4.5.922a.75.75 0 0 1-.882-.897l1-4.5a.75.75 0 0 1 .202-.367zm3.498 1.058a1.7 1.7 0 0 0-2.438.002l-.97.97 2.479 2.478.93-.93c.68-.68.681-1.832-.001-2.52M7.685 13.876 14 7.56l2.478 2.478-6.35 6.35-3.145.644zM3.5 20.25a.75.75 0 0 0 0 1.5h17a.75.75 0 0 0 0-1.5z" clip-rule="evenodd" /></svg
>
