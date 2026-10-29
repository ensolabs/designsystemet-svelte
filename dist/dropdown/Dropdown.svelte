<!--
  A menu that opens from a trigger: a Popover with the `ds-dropdown` class, placed `bottom-end` by default. Put a
  Dropdown.Trigger and the Dropdown in a Dropdown.TriggerContext, and fill it with Dropdown.Heading and Dropdown.List
  of Dropdown.Item with Dropdown.Button. Bind `open` as on Popover.
-->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type { Placement } from '../popover/context';
  import Popover from '../popover/Popover.svelte';

  type Props = Omit<ComponentProps<typeof Popover>, 'variant' | 'class'> & { placement?: Placement; class?: string };

  let { placement = 'bottom-end', class: className, open = $bindable(), ref = $bindable(), ...rest }: Props = $props();
</script>

<Popover bind:open bind:ref class={['ds-dropdown', className].filter(Boolean).join(' ')} {placement} {...rest} />
