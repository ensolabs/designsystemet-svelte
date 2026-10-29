<!-- A red box spinning in step with every other box running `spin`, with useSynchronizedAnimation. -->
<script lang="ts">
  import { useSynchronizedAnimation } from '../../../../src';

  const ref = useSynchronizedAnimation<HTMLDivElement>('spin');
</script>

<div bind:this={ref.current} style="animation: spin 2s linear infinite; width: 30px; height: 30px; background-color: red"></div>
