<!-- AllowIndeterminate: two rows with a checkbox each, and a "select all" checkbox in the header (allowIndeterminate),
     all from useCheckboxGroup. -->
<script lang="ts">
  import { Checkbox, Table, useCheckboxGroup } from '../../../../src';

  const { getCheckboxProps } = useCheckboxGroup({ name: 'my-checkbox' });
</script>

<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox aria-label="Select all" {...getCheckboxProps({ allowIndeterminate: true, value: 'all' })} />
      </Table.HeaderCell>
      <Table.HeaderCell>Header</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each [1, 2] as row (row)}
      <Table.Row>
        <Table.Cell><Checkbox aria-label="Check {row}" {...getCheckboxProps(`${row}`)} /></Table.Cell>
        <Table.Cell>Content</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
