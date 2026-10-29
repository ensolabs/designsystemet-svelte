<!--
  useCheckboxGroup isn't ported: the checkboxes share a `bind:group`, and "select all" is checked, or indeterminate, from it.
-->
<script lang="ts">
  import { Checkbox, Table, Textfield } from '../../../../src';

  const rows = ['Kari Nordmann', 'Ola Nordmann', 'Jens Nordmann'];
  let selected = $state(['Kari Nordmann']);
  const all = $derived(selected.length === rows.length);
  let selectAll = $state<HTMLInputElement>();
  // As useCheckboxGroup's effect: indeterminate is a property only.
  $effect(() => {
    if (selectAll) selectAll.indeterminate = selected.length > 0 && !all;
  });
</script>

<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox
          aria-label="Velg alle ansatte"
          name="my-checkbox"
          value=""
          checked={all}
          bind:ref={selectAll}
          onchange={(event) => (selected = event.currentTarget.checked ? [...rows] : [])}
        />
      </Table.HeaderCell>
      <Table.HeaderCell>Navn</Table.HeaderCell>
      <Table.HeaderCell>Stilling</Table.HeaderCell>
      <Table.HeaderCell>Kommentar</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each rows as row (row)}
      <Table.Row>
        <Table.Cell>
          <Checkbox aria-label={`Velg ${row}`} name="my-checkbox" value={row} bind:group={selected} />
        </Table.Cell>
        <Table.Cell>{row}</Table.Cell>
        <Table.Cell>Rådgiver</Table.Cell>
        <Table.Cell>
          <Textfield data-size="sm" aria-label={`Textfield ${row}`} />
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
