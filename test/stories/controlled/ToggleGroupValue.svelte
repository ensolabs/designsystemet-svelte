<!-- A ToggleGroup for the controlled-state tests: uncontrolled (with or without defaultValue), controlled by `value` (with
     a parent that follows onChange or not), or bound with bind:value. The state goes to an `output`. -->
<script lang="ts">
  import { untrack } from 'svelte';
  import { ToggleGroup } from '../../../src/toggle-group';

  type Props = { value?: string; defaultValue?: string; follow?: boolean; bind?: boolean; onChange?: (value: string) => void };
  let { value: initial, defaultValue, follow = false, bind = false, onChange }: Props = $props();

  let value = $state(untrack(() => initial));
</script>

<div class="story">
  {#if bind}
    <ToggleGroup aria-label="Visning" name="visning" bind:value {defaultValue} {onChange}>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup>
  {:else}
    <ToggleGroup
      aria-label="Visning"
      name="visning"
      {value}
      {defaultValue}
      onChange={(next) => {
        onChange?.(next);
        if (follow) value = next;
      }}
    >
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup>
  {/if}
</div>
<output>{JSON.stringify(value ?? null)}</output>
