<!-- A red box spinning in step with every other box running `spin`. -->
<script lang="ts">
  import { synchronizedAnimation } from '../../../../src';
</script>

<div
  {@attach synchronizedAnimation('spin')}
  style="animation: spin 2s linear infinite; width: 30px; height: 30px; background-color: red"
></div>
