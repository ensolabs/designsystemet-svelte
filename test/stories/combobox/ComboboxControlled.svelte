<!-- A Combobox for the controlled-state tests: uncontrolled, controlled by `value` (with a parent that follows
     onValueChange or not), or bound with bind:value. A button adds an option between the others; `extra` adds a child
     that isn't an option, after them. The parent's value goes to an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { Combobox } from '../../../src/combobox';

  type Props = {
    value?: string[];
    bind?: boolean;
    follow?: boolean;
    extra?: boolean;
    multiple?: boolean;
    onValueChange?: (value: string[]) => void;
    oninput?: (event: Event) => void;
  };
  let { value: initial, bind = false, follow = false, extra = false, multiple = false, onValueChange, oninput }: Props = $props();

  let value = $state(untrack(() => initial));
  let places = $state([
    { name: 'Oslo', value: '0301' },
    { name: 'Bergen', value: '4601' },
    { name: 'Bodø', value: '1804' },
  ]);
  const add = () => places.splice(1, 0, { name: 'Lillehammer', value: '3405' });
</script>

<div class="story">
  <button id="add" onclick={add}>Legg til</button>
  {#snippet options()}
    <Combobox.Empty>Ingen treff</Combobox.Empty>
    {#each places as place (place.value)}
      <Combobox.Option value={place.value}>{place.name}</Combobox.Option>
    {/each}
    {#if extra}<p>Ekstra</p>{/if}
  {/snippet}
  {#if bind}
    <Combobox label="Kommune" bind:value {multiple} {onValueChange} {oninput}>{@render options()}</Combobox>
  {:else}
    <Combobox
      label="Kommune"
      {value}
      {multiple}
      {oninput}
      onValueChange={(next) => {
        onValueChange?.(next);
        if (follow) value = next;
      }}>{@render options()}</Combobox
    >
  {/if}
</div>
<output>{JSON.stringify(value ?? null)}</output>
