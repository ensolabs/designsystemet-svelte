<!-- A link to the main content, hidden until focused. Put it first on the page: `href="#main-content"`. -->
<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAnchorAttributes & { ref?: HTMLAnchorElement };

  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<a bind:this={ref} class={['ds-skip-link', className]} {...rest}>{@render children?.()}</a>
