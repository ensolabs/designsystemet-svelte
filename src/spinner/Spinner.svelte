<!--
  Spinner for a busy or indeterminate state. Give it an `aria-label`, or `aria-hidden="true"` when text beside it says
  the same.
-->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { synchronizedAnimation } from '../utilities/synchronized-animation';

  type Props = SVGAttributes<SVGSVGElement> & {
    'data-size'?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    ref?: SVGSVGElement;
  };

  let { class: className, ref = $bindable(), ...rest }: Props = $props();
</script>

<svg
  bind:this={ref}
  class={['ds-spinner', className]}
  role="img"
  viewBox="0 0 50 50"
  {@attach synchronizedAnimation('ds-spinner-rotate-animation')}
  {...rest}
>
  <circle class="ds-spinner__background" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
    {@attach synchronizedAnimation('ds-spinner-stroke-animation')}
  ></circle>
</svg>
