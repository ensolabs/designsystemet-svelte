<!-- A Button that opens the Dialog in the same Dialog.TriggerContext, modal unless the Dialog says `modal={false}`. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Button from '../button/Button.svelte';
  import { getDialogContext } from './context';

  type Props = ComponentProps<typeof Button>;

  let { child, children, ref = $bindable(), ...rest }: Props = $props();

  const context = getDialogContext();

  const openDialog = () => {
    if (context.current?.getAttribute('data-modal') === 'true') context.current?.showModal();
    else context.current?.show();
  };

  const attrs = $derived({ 'aria-haspopup': 'dialog' as const, onclick: openDialog, ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <Button bind:ref {...attrs}>{@render children?.()}</Button>
{/if}
