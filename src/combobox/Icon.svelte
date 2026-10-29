<!-- An @navikt/aksel-icons icon, with the markup of its React component: a `title` gets an id the svg points at. -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  type Props = SVGAttributes<SVGSVGElement> & { d: string; evenodd?: boolean; title?: string };

  let { d, evenodd = false, title, ...rest }: Props = $props();
  const uid = $props.id();
  const titleId = $derived(title ? `title-${uid}` : undefined);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby={titleId} {...rest}
  >{#if title}<title id={titleId}>{title}</title>{/if}<path
    fill="currentColor"
    fill-rule={evenodd ? 'evenodd' : undefined}
    {d}
    clip-rule={evenodd ? 'evenodd' : undefined}
  /></svg
>
