<!-- RovingFocusRoot with three items, one of them identified by its text only. -->
<script lang="ts">
  import { RovingFocusItem, RovingFocusRoot } from '../../../src';

  let { activeValue, orientation }: { activeValue?: string; orientation?: 'vertical' | 'horizontal' | 'ambiguous' } = $props();
</script>

<div class="story">
  <RovingFocusRoot {activeValue} {orientation} aria-label="Valg" class="root">
    <RovingFocusItem value="a">A</RovingFocusItem>
    <RovingFocusItem value="b" class="b">B</RovingFocusItem>
    <RovingFocusItem>C</RovingFocusItem>
  </RovingFocusRoot>
</div>
