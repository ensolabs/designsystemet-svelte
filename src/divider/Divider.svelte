<!-- An `hr` that separates content. It is `aria-hidden` unless you set `aria-hidden` yourself. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLHRElement> & { ref?: HTMLHRElement };

  let { class: className, ref = $bindable(), ...rest }: Props = $props();
</script>

<hr bind:this={ref} aria-hidden="true" class={['ds-divider', className]} {...rest} />
