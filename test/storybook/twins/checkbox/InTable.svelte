<!-- InTable: a checkbox per row from useCheckboxGroup, and a "select all" checkbox in the header
     (allowIndeterminate) that is checked when every row is and indeterminate when some are. -->
<script lang="ts">
  import { Checkbox, Table, useCheckboxGroup } from '../../../../src';
  import { tableData } from './people';

  // Storybook's context.id, which the story runtime leaves out.
  const id = undefined;
  const { getCheckboxProps } = useCheckboxGroup({ name: id, value: ['2', '3'], label: '' } as Parameters<typeof useCheckboxGroup>[0]);
</script>

<Table>
  <colgroup>
    <!-- ensure the first column only takes up the necessary space -->
    <col style="width: 1px" />
    <col />
    <col />
  </colgroup>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox aria-label="Velg alle" {...getCheckboxProps({ allowIndeterminate: true, value: 'all' })} />
      </Table.HeaderCell>
      <Table.HeaderCell>Navn</Table.HeaderCell>
      <Table.HeaderCell>E-post</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each tableData as person (person.id)}
      <Table.Row>
        <Table.Cell>
          <Checkbox aria-labelledby="{id}-{person.id}-name" {...getCheckboxProps(person.id.toString())} />
        </Table.Cell>
        <Table.Cell id="{id}-{person.id}-name">{person.navn}</Table.Cell>
        <Table.Cell>{person.epost}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
