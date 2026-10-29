<!--
  The Input of Suggestion. Suggestion controls its value: use `selected` on Suggestion, or `oninput` to fetch options
  as the user types. As in React, `value` and `onchange` aren't passed on.
-->
<script lang="ts">
  import { untrack } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Input from '../input/Input.svelte';
  import type { DefaultProps } from '../types';
  import { getSuggestionContext } from './context';

  type Props = DefaultProps & Omit<HTMLInputAttributes, 'size' | 'role'> & { size?: number | null; ref?: HTMLInputElement };

  let { value, oninput, onchange, ref = $bindable(), ...rest }: Props = $props();

  const { handleFilter } = getSuggestionContext();

  $effect(() => {
    void value;
    untrack(handleFilter);
  });

  $effect(() => {
    if (onchange) console.warn('SuggestionInput: Avoid using onChange, as Suggestion controls the Input. Use onSelectedChange on Suggestion instead, or onInput if fetching API results');
    if (value) console.warn('SuggestionInput: Avoid using value, as Suggestion controls the Input. Use selected on Suggestion instead.');
  });
</script>

<Input
  placeholder=""
  bind:ref
  oninput={(event) => {
    oninput?.(event);
    handleFilter();
  }}
  {...rest}
/>
