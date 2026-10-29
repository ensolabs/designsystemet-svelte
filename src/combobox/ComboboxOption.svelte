<!--
  An option of a Combobox: `value` is what is selected; the text, or `displayValue`, is what the input and the chips
  show. `description` goes under the text. It registers with its Combobox, which renders its button in the open list.
-->
<script lang="ts">
  import { onDestroy } from 'svelte';
  import { observeText } from '#combobox-text';
  import { getComboboxContext, getMode, prefix, type ComboboxOptionProps, type OptionEntry } from './context';

  let { ref = $bindable(), ...optionProps }: ComboboxOptionProps = $props();

  const context = getComboboxContext('ComboboxOption');
  const mode = getMode();
  const uid = $props.id();

  // Where it is among the children: a `template` in the collect pass, which isn't in the document.
  let node = $state<Node>();

  if (mode === 'collect') {
    // React reads the label from the strings among the children; here, the text the children render.
    let text = $state('');
    const update = (value: string) => (text = value);
    // While hydrating (the id comes from the server), mounting elsewhere would break hydration: read it once mounted.
    if (typeof window === 'undefined' || /^c\d+$/.test(uid)) {
      // svelte-ignore state_referenced_locally
      const stop = optionProps.children ? observeText(optionProps.children, update) : () => {};
      onDestroy(stop);
    } else {
      $effect(() => (optionProps.children ? observeText(optionProps.children, update) : undefined));
    }
    const entry: OptionEntry = {
      get key() {
        return prefix(String(optionProps.value));
      },
      get item() {
        const { value, displayValue, description } = optionProps;
        return { value: String(value), label: displayValue || text, displayValue, description };
      },
      get props() {
        return optionProps;
      },
      get children() {
        return optionProps.children;
      },
      get node() {
        return node;
      },
      get ref() {
        return ref;
      },
      set ref(value) {
        ref = value;
      },
    };
    const unregister = context.register(entry);
    // On the server, the collect pass is a render of its own, which ends (and runs `onDestroy`) before Combobox renders.
    if (typeof window !== 'undefined') onDestroy(unregister);
  }
</script>

{#if mode === 'collect'}<template bind:this={node}></template>{/if}
