<!-- The search Input, for Search. `type="text"` hides the magnifying glass. Bind `value`. -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Input from '../input/Input.svelte';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps & Omit<HTMLInputAttributes, 'readonly' | 'type' | 'size'> & { type?: 'text' | 'search'; size?: number | null; ref?: HTMLInputElement };

  let { type = 'search', value = $bindable(), ref = $bindable(), ...rest }: Props = $props();
</script>

<Input bind:ref bind:value {type} {...rest} />
