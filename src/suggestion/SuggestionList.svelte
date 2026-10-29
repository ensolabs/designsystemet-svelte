<!--
  The list of Suggestion.Option, a `u-datalist` popover that designsystemet-web opens under the input. `singular` and
  `plural` are deprecated upstream: set `data-sr-singular` and `data-sr-plural` on Suggestion. As in React, `id` and
  `autoPlacement` are accepted and not rendered.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';
  import { getSuggestionContext } from './context';

  type Props = DefaultProps &
    Omit<HTMLAttributes<HTMLDataListElement>, 'autoPlacement'> & {
      /** @deprecated Use `data-sr-singular` on Suggestion. The screen reader text for one suggestion; `%d` is the number. */
      singular?: string;
      /** @deprecated Use `data-sr-plural` on Suggestion. The screen reader text for several suggestions; `%d` is the number. */
      plural?: string;
      /** Whether to enable auto placement. Default `true`. */
      autoPlacement?: boolean;
      ref?: HTMLDataListElement;
    };

  let { singular, plural, class: className, id: _id, autoPlacement: _autoPlacement = true, children, ref = $bindable(), ...rest }: Props = $props();

  const { handleFilter } = getSuggestionContext();

  // React filters after every render of the list; here, when it mounts, when `filter` changes and when its options do.
  $effect(() => {
    handleFilter();
    if (!ref) return;
    const observer = new MutationObserver(() => handleFilter());
    observer.observe(ref, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  });
</script>

<u-datalist bind:this={ref} class={className} data-nofilter="" data-sr-plural={plural} data-sr-singular={singular} popover="manual" role="listbox" {...rest}>
  {@render children?.()}
</u-datalist>
