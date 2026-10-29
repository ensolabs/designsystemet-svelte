<!--
  Groups content about one thing, in Card.Block sections. `variant` is `default` or `tinted`. If a heading in the card
  holds a link, the card gets `data-clickdelegatefor` pointing at it (giving the link an id if it has none), and
  designsystemet-web sends clicks anywhere on the card to that link. With `child`, the spread props carry this too.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'tinted'; child?: ChildSnippet; ref?: HTMLElement };

  let { variant, class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const ATTR_CLICKDELEGATE = 'data-clickdelegatefor';
  const SELECTOR_LINK = ':is(h1,h2,h3,h4,h5,h6) a';
  const SELECTOR_SKIP = 'a,button,label,details,dialog,[role="button"],[popover],[contenteditable]';
  const linkGeneratedId = $props.id();
  const attachment = createAttachmentKey();

  const clickDelegate = (card: Element) => {
    if (card instanceof HTMLElement) ref = card;
    const link = card.querySelector(SELECTOR_LINK);
    const skip = !link || link.parentElement?.closest(SELECTOR_SKIP);
    const id = link?.id;
    if (card.hasAttribute(ATTR_CLICKDELEGATE) || skip) return;
    link.id = id || linkGeneratedId;
    card.setAttribute(ATTR_CLICKDELEGATE, link.id);
    return () => {
      if (id && link) link.id = id;
      else link?.removeAttribute('id');
      card.removeAttribute(ATTR_CLICKDELEGATE);
    };
  };

  const attrs = $derived({ class: ['ds-card', className], 'data-variant': variant, ...rest, [attachment]: clickDelegate });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <div {...attrs}>{@render children?.()}</div>
{/if}
