<!-- InTableWithPagination: three rows a page, a checkbox per row and a "select all" checkbox from useCheckboxGroup, and
     a Pagination from usePagination. -->
<script lang="ts">
  import { Checkbox, Pagination, Table, useCheckboxGroup, usePagination } from '../../../../src';
  import { tableData } from './people';

  const itemsPerPage = 3;
  let currentPage = $state(1);

  const { getCheckboxProps } = useCheckboxGroup({ label: '' } as Parameters<typeof useCheckboxGroup>[0]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const pagination = usePagination({
    get currentPage() {
      return currentPage;
    },
    setCurrentPage: (page) => (currentPage = page),
    totalPages,
    showPages: totalPages,
  });

  // Compute the slice of users to display on the current page
  const currentData = $derived.by(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tableData.slice(startIndex, startIndex + itemsPerPage);
  });
</script>

<div>
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox aria-label="Select all" {...getCheckboxProps({ allowIndeterminate: true, value: 'all' })} />
        </Table.HeaderCell>
        <Table.HeaderCell>Navn</Table.HeaderCell>
        <Table.HeaderCell>Epost</Table.HeaderCell>
        <Table.HeaderCell>Telefon</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {#each currentData as user (user.id)}
        <Table.Row>
          <Table.Cell>
            <Checkbox aria-label={'Check ' + user.id} {...getCheckboxProps({ value: user.id.toString() })} />
          </Table.Cell>
          <Table.Cell>{user.navn}</Table.Cell>
          <Table.Cell>{user.epost}</Table.Cell>
          <Table.Cell>{user.telefon}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table>
  <Pagination>
    <Pagination.List>
      <Pagination.Item><Pagination.Button {...pagination.prevButtonProps}>Forrige</Pagination.Button></Pagination.Item>
      {#each pagination.pages as { itemKey, buttonProps, page } (itemKey)}
        <Pagination.Item>
          {#if typeof page === 'number'}
            <Pagination.Button {...buttonProps} aria-label={`Side ${page}`}>{page}</Pagination.Button>
          {/if}
        </Pagination.Item>
      {/each}
      <Pagination.Item><Pagination.Button {...pagination.nextButtonProps}>Neste</Pagination.Button></Pagination.Item>
    </Pagination.List>
  </Pagination>
</div>
