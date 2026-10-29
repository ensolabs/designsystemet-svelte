<!-- The row of Tabs.Tab in Tabs: designsystemet-web's `<ds-tablist>`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLElement> & { ref?: HTMLElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<ds-tablist bind:this={ref} {...rest}>{@render children?.()}</ds-tablist>
