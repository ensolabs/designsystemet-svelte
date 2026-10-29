<!-- EnvelopeClosedIcon from @navikt/aksel-icons, as Svelte: the same markup as the React icon. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let { title, titleId, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string; titleId?: string } = $props();
  const uid = $props.id();
  const id = $derived(title ? (titleId ?? `title-${uid}`) : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={id} {...rest}
  >{#if title}<title {id}>{title}</title>{/if}<path fill="currentColor" fill-rule="evenodd" d="M3 5.25a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75zm.75 11.94 5.273-5.273L3.75 8.4zm6.546-4.425L4.81 18.25h14.378l-5.485-5.485-1.288.859a.75.75 0 0 1-.832 0zm4.681-.848L20.25 8.4v8.788zm-11-5.167L12 12.099l8.023-5.349z" clip-rule="evenodd" /></svg
>
