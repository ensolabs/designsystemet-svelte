<!-- InTableWithPagination: three rows a page, a checkbox per row bound to one array, a "select all" checkbox for the
     rows on the page, and a Pagination driven by pagination(). -->
<script lang="ts">
  import { Checkbox, Pagination, Table, pagination } from '../../../../src';
  import { tableData } from './people';

  const itemsPerPage = 3;
  const name = $props.id();
  let currentPage = $state(1);
  let value = $state<string[]>([]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const p = $derived(pagination({ currentPage, setCurrentPage: (page) => (currentPage = page), totalPages, showPages: totalPages }));
  const currentData = $derived(tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  const ids = $derived(currentData.map((user) => `${user.id}`));
  const all = $derived(ids.every((v) => value.includes(v)));
  const some = $derived(ids.some((v) => value.includes(v)));
  // A checkbox's indeterminate state is a property, not an attribute: set it on the element, as useCheckboxGroup does.
  let selectAll = $state<HTMLInputElement>();
  $effect(() => {
    if (selectAll) selectAll.indeterminate = some && !all;
  });
</script>

<div>
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox
            aria-label="Select all"
            {name}
            value="all"
           
            checked={all}
            bind:ref={selectAll}
            onchange={() => (value = all ? value.filter((v) => !ids.includes(v)) : [...new Set([...value, ...ids])])}
          />
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
            <Checkbox aria-label="Check {user.id}" {name} value={`${user.id}`} bind:group={value} />
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
      <Pagination.Item><Pagination.Button {...p.prevButtonProps}>Forrige</Pagination.Button></Pagination.Item>
      {#each p.pages as { itemKey, buttonProps, page } (itemKey)}
        <Pagination.Item>
          {#if typeof page === 'number'}
            <Pagination.Button {...buttonProps} aria-label="Side {page}">{page}</Pagination.Button>
          {/if}
        </Pagination.Item>
      {/each}
      <Pagination.Item><Pagination.Button {...p.nextButtonProps}>Neste</Pagination.Button></Pagination.Item>
    </Pagination.List>
  </Pagination>
</div>
