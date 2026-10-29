<!--
  A native `select`, with Select.Option and Select.Optgroup. `width` is `full` or `auto`. A select can't be read-only in
  HTML: `readonly` (or `aria-readonly`) sets `aria-readonly`, and designsystemet-web stops changes. Bind `value`.
-->
<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { DefaultProps } from '../types';

  type Props = DefaultProps &
    Omit<HTMLSelectAttributes, 'multiple' | 'size'> & { readonly?: boolean; width?: 'full' | 'auto'; ref?: HTMLSelectElement };

  // React takes `onKeyDown` and `onMouseDown` and drops them; so does this port.
  let {
    class: className,
    onkeydown,
    onmousedown,
    width,
    readonly,
    value = $bindable(),
    children,
    ref = $bindable(),
    ...rest
  }: Props = $props();
</script>

<select
  bind:this={ref}
  bind:value
  class={['ds-input', className]}
  aria-readonly={rest['aria-readonly'] ?? readonly}
  data-width={width}
  {...rest}
>
  {@render children?.()}
</select>
