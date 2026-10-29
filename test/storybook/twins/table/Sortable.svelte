<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Table, TableHeaderCell } from '../../../../src';
  import { dummyData } from './data';

  type Field = keyof (typeof dummyData)[0];
  type Sort = ComponentProps<typeof TableHeaderCell>['sort'];

  let sortField = $state<Field | null>(null);
  let sortDirection = $state<Sort>(undefined);

  const handleSort = (field: Field) => {
    if (sortField === field && sortDirection === 'descending') {
      sortField = null;
      sortDirection = undefined;
    } else {
      sortDirection = sortField === field && sortDirection === 'ascending' ? 'descending' : 'ascending';
      sortField = field;
    }
  };

  const sortedData = $derived(
    [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField]) return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    }),
  );
</script>

<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell sort={sortField === 'navn' ? sortDirection : 'none'} onclick={() => handleSort('navn')}>
        Navn
      </Table.HeaderCell>
      <Table.HeaderCell>Epost</Table.HeaderCell>
      <Table.HeaderCell sort={sortField === 'telefon' ? sortDirection : 'none'} onclick={() => handleSort('telefon')}>
        Telefon
      </Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each sortedData as row (row.id)}
      <Table.Row>
        <Table.Cell>{row.navn}</Table.Cell>
        <Table.Cell>{row.epost}</Table.Cell>
        <Table.Cell>{row.telefon}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
