<script lang="ts">
  import { Button, Combobox } from '../../../../src';
  import Places from './Places.svelte';

  let value = $state<string[]>([]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const values = Array.from(formData.values());
    alert(values);
  };
</script>

<form onsubmit={handleSubmit}>
  <Combobox label="Hvor går reisen?" bind:value multiple name="sted"><Places /></Combobox>

  <Button style="margin-top: 1rem" type="submit">Send!</Button>
</form>
