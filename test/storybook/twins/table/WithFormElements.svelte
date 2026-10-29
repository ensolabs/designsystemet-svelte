<!-- WithFormElements: a checkbox per row and a "select all" checkbox (allowIndeterminate) from useCheckboxGroup, and a
     Textfield per row. -->
<script lang="ts">
  import { Checkbox, Table, Textfield, useCheckboxGroup } from '../../../../src';

  const { getCheckboxProps } = useCheckboxGroup({ name: 'my-checkbox', value: ['Kari Nordmann'] });
</script>

<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox aria-label="Velg alle ansatte" {...getCheckboxProps({ allowIndeterminate: true })} />
      </Table.HeaderCell>
      <Table.HeaderCell>Navn</Table.HeaderCell>
      <Table.HeaderCell>Stilling</Table.HeaderCell>
      <Table.HeaderCell>Kommentar</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each ['Kari Nordmann', 'Ola Nordmann', 'Jens Nordmann'] as row (row)}
      <Table.Row>
        <Table.Cell>
          <Checkbox aria-label={`Velg ${row}`} {...getCheckboxProps(String(row))} />
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
