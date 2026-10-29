<!--
  A pulsing placeholder while content loads. `variant` is `rectangle`, `circle` or `text`; `width` and `height` are CSS
  lengths (numbers are pixels). For `text`, `width` is instead the length in characters and goes in `data-text`. Without
  a variant it takes the size of its children, which stay hidden.
-->
<script module lang="ts">
  /** React's `{ ...base, ...style }`: numbers get `px`, empty values are dropped, and `style` wins. */
  function mergeStyle(base: Record<string, string | number | undefined>, style: string | null | undefined) {
    const own = new Set((style ?? '').split(';').map((declaration) => declaration.split(':')[0].trim().toLowerCase()));
    const declarations = Object.entries(base)
      .filter(([name, value]) => value !== undefined && value !== '' && !own.has(name))
      .map(([name, value]) => `${name}: ${typeof value === 'number' && value !== 0 ? `${value}px` : value}`);
    if (style) declarations.push(style);
    return declarations.join('; ') || undefined;
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { ChildSnippet } from '../types';
  import { synchronizedAnimation } from '../utilities/synchronized-animation';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    width?: string | number;
    height?: string | number;
    variant?: 'rectangle' | 'circle' | 'text';
    /** Declared upstream but unused there: it ends up as an attribute, as in React. */
    characters?: number;
    child?: ChildSnippet;
    ref?: HTMLElement;
  };

  let { class: className, height, style, variant, width, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attachment = createAttachmentKey();
  const animation = synchronizedAnimation('ds-skeleton-opacity-fade');
  const setup = (element: Element) => {
    if (element instanceof HTMLElement) ref = element;
    return animation(element);
  };

  const isText = $derived(variant === 'text');
  const attrs = $derived({
    'aria-hidden': 'true' as const,
    class: ['ds-skeleton', className],
    'data-text': isText ? '-'.repeat(Number(width) || 1) : undefined,
    'data-variant': variant,
    style: isText ? style : mergeStyle({ width, height }, style),
    ...rest,
    [attachment]: setup,
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <span {...attrs}>{@render children?.()}</span>
{/if}
