<!-- The Default story: a Textfield whose value is shown a second after the typing stops, with useDebounceCallback. -->
<script lang="ts">
  import { Paragraph, Textfield, useDebounceCallback } from '../../../../src';

  let value = $state('');
  const debouncedCallback = useDebounceCallback((next: string) => {
    value = next;
  }, 1000);
</script>

<Textfield oninput={(e) => debouncedCallback(e.currentTarget.value)} placeholder="Type something..." aria-label="Type something" />
<Paragraph>Debounced value: {value}</Paragraph>
