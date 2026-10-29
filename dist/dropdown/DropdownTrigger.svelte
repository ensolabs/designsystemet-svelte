<!-- Opens the Dropdown in the same Dropdown.TriggerContext: a Popover.Trigger. As in React, `child` is dropped. -->
<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import PopoverTrigger from '../popover/PopoverTrigger.svelte';

  type Props = ComponentProps<typeof PopoverTrigger>;

  let { child: _child, ref = $bindable(), ...rest }: Props = $props();
</script>

<PopoverTrigger bind:ref {...rest} />
