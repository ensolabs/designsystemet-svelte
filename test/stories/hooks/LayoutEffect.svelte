<!-- useIsomorphicLayoutEffect, with and without deps: each writes how often it has run into an element. -->
<script lang="ts">
  import { Button, useIsomorphicLayoutEffect } from '../../../src';

  let count = $state(0);
  let always = $state<HTMLElement>();
  let once = $state<HTMLElement>();
  let runsAlways = 0;
  let runsOnce = 0;

  useIsomorphicLayoutEffect(() => {
    void count;
    if (always) always.textContent = `${++runsAlways}`;
  });
  useIsomorphicLayoutEffect(() => {
    if (once) once.textContent = `${++runsOnce}`;
  }, []);
</script>

<div class="story">
  <p bind:this={always}></p>
  <p bind:this={once}></p>
  <Button onclick={() => count++}>{count}</Button>
</div>
