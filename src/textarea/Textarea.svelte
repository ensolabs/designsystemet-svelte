<!-- A native `textarea`. Bind `value` as on a plain textarea. `autofocus` as on Input: a string is written as it is. -->
<script lang="ts">
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & Omit<HTMLTextareaAttributes, 'autofocus'> & { autofocus?: boolean | string | null; ref?: HTMLTextAreaElement };

  let { class: className, value = $bindable(), autofocus, ref = $bindable(), ...props }: Props = $props();

  const attachment = createAttachmentKey();
  // As Input: Svelte's client writes `autofocus=""` whatever the value, so a string is set by an attachment.
  const rest = $derived(
    typeof autofocus === 'string' && typeof window !== 'undefined'
      ? { ...props, [attachment]: (el: HTMLTextAreaElement) => el.setAttribute('autofocus', autofocus) }
      : { ...props, autofocus: autofocus as boolean | null | undefined },
  );
</script>

<textarea bind:this={ref} class={['ds-input', className]} bind:value {...rest}></textarea>
