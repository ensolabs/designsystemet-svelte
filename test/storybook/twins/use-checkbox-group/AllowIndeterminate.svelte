<!-- AllowIndeterminate: two rows with a checkbox each, bound to one array, and a "select all" checkbox in the header
     that is checked when both are and indeterminate when one is. -->
<script lang="ts">
  import { Checkbox, Table } from '../../../../src';

  const rows = ['1', '2'];
  let value = $state<string[]>([]);
  const all = $derived(rows.every((row) => value.includes(row)));
  const some = $derived(rows.some((row) => value.includes(row)));
  // A checkbox's indeterminate state is a property, not an attribute: set it on the element, as useCheckboxGroup does.
  let selectAll = $state<HTMLInputElement>();
  $effect(() => {
    if (selectAll) selectAll.indeterminate = some && !all;
  });
</script>

<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox
          aria-label="Select all"
          name="my-checkbox"
          value="all"
          checked={all}
          bind:ref={selectAll}
          onchange={() => (value = all ? [] : rows)}
        />
      </Table.HeaderCell>
      <Table.HeaderCell>Header</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each rows as row (row)}
      <Table.Row>
        <Table.Cell><Checkbox aria-label="Check {row}" name="my-checkbox" value={row} bind:group={value} /></Table.Cell>
        <Table.Cell>Content</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
