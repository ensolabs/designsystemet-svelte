<!-- The TestMediaQuery story: whether the screen is narrower than 1000px, from useMediaQuery. -->
<script lang="ts">
  import { Paragraph, useMediaQuery } from '../../../../src';

  const isBelow = useMediaQuery('(max-width: 1000px)');
</script>

<div>
  <Paragraph>Er skjermen mindre enn 1000px? {isBelow.current ? 'Ja' : 'Nei'}</Paragraph>
</div>
