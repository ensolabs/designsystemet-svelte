<script lang="ts">
  import { Avatar, Checkbox, EXPERIMENTAL_AvatarStack as AvatarStack, Field, Label } from '../../../../src';
  import { cat1Img, cat5Img } from '../constants/cats.svelte';

  let expandable = $state<true | undefined>(undefined);
  let size = $state(64);
  let radius = $state(150);
  let overlap = $state(32);
  let gap = $state(2);
</script>

<fieldset>
  <Checkbox label="Expandable" checked={expandable !== undefined} onchange={() => (expandable = expandable ? undefined : true)} />

  <Field>
    <Label>Radius {`${radius}px`}</Label>
    <input min="0" max="150" step="1" type="range" bind:value={radius} />
  </Field>
  <Field>
    <Label>Size {`${size}px`}</Label>
    <input min="24" max="150" step="1" type="range" bind:value={size} />
  </Field>
  <Field>
    <Label>Overlap {`${overlap}px`}</Label>
    <input min="0" max="150" step="1" type="range" bind:value={overlap} />
  </Field>
  <Field>
    <Label>Gap {`${gap}px`}</Label>
    <input min="0" max="15" step="1" type="range" bind:value={gap} />
  </Field>
</fieldset>
<br />

<AvatarStack
  {expandable}
  style={`--dsc-avatar-stack-gap: ${gap}px; --dsc-avatar-stack-overlap: ${overlap}px; --dsc-avatar-stack-radius: ${radius}px; --dsc-avatar-stack-size: ${size}px`}
>
  <li><Avatar aria-label="profile a">{@render cat1Img()}</Avatar></li>
  <li><Avatar aria-label="profile b">{@render cat5Img()}</Avatar></li>
  <li><Avatar aria-label="profile c">md</Avatar></li>
  <li><Avatar aria-label="profile d">{@render cat5Img()}</Avatar></li>
  <li><Avatar aria-label="profile e">{@render cat1Img()}</Avatar></li>
  <li>+10</li>
</AvatarStack>
