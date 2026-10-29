<!-- Svelte twins of packages/react/src/components/table/table.stories.tsx. -->
<script module lang="ts">
  import { Table } from '../../../src';
  import Sortable from './table/Sortable.svelte';
  import WithFormElements from './table/WithFormElements.svelte';

  const range = (length: number) => Array.from({ length }, (_, i) => i + 1);

  export {
    Preview,
    Numbers,
    SortableStory as Sortable,
    StickyHeader,
    WithFormElementsStory as WithFormElements,
    FixedTable,
    MultipleHeaderRows,
    WithBorder,
  };
</script>

{#snippet headerRow(cells: string[])}
  <Table.Row>
    {#each cells as cell (cell)}<Table.HeaderCell>{cell}</Table.HeaderCell>{/each}
  </Table.Row>
{/snippet}

{#snippet bodyRows(count: number)}
  {#each range(count) as row (row)}
    <Table.Row>
      <Table.Cell>{`Cell ${row}1`}</Table.Cell>
      <Table.Cell>{`Cell ${row}2`}</Table.Cell>
      <Table.Cell>{`Cell ${row}3`}</Table.Cell>
    </Table.Row>
  {/each}
{/snippet}

{#snippet Preview()}
  <Table zebra={false} stickyHeader={false} border={false} hover={false}>
    <caption>Table caption</caption>
    <Table.Head>{@render headerRow(['Header 1', 'Header 2', 'Header 3'])}</Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
        <Table.Cell>Cell 3</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell 4</Table.Cell>
        <Table.Cell>Cell 5</Table.Cell>
        <Table.Cell>Cell 6</Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Foot>{@render headerRow(['Footer 1', 'Footer 2', 'Footer 3'])}</Table.Foot>
  </Table>
{/snippet}

{#snippet Numbers()}
  <Table style="table-layout: fixed; font-variant-numeric: tabular-nums" zebra border>
    <caption>Antall søknader per måned</caption>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell scope="col">Måned</Table.HeaderCell>
        <Table.HeaderCell scope="col" style="text-align: right">2023</Table.HeaderCell>
        <Table.HeaderCell scope="col" style="text-align: right">2024</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {#each [['Januar', '1 230', '1 450'], ['Februar', '980', '1 120'], ['Mars', '1 150', '1 300']] as [month, a, b] (month)}
        <Table.Row>
          <Table.HeaderCell scope="row">{month}</Table.HeaderCell>
          <Table.Cell style="text-align: right">{a}</Table.Cell>
          <Table.Cell style="text-align: right">{b}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table>
{/snippet}

{#snippet SortableStory()}<Sortable />{/snippet}

{#snippet StickyHeader()}
  <div style="height: 280px; overflow: auto">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <Table stickyHeader tabindex={0}>
      <Table.Head>{@render headerRow(['Header 1', 'Header 2', 'Header 3'])}</Table.Head>
      <Table.Body>{@render bodyRows(50)}</Table.Body>
    </Table>
  </div>
{/snippet}

{#snippet WithFormElementsStory()}<WithFormElements />{/snippet}

{#snippet FixedTable()}
  <Table style="table-layout: fixed">
    <Table.Head>{@render headerRow(['Header 1', 'Header 2', 'Header 3'])}</Table.Head>
    <Table.Body>{@render bodyRows(3)}</Table.Body>
  </Table>
{/snippet}

{#snippet MultipleHeaderRows()}
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Header 1</Table.HeaderCell>
        <Table.HeaderCell colspan={2}>Header 2</Table.HeaderCell>
      </Table.Row>
      {@render headerRow(['Header 3', 'Header 4', 'Header 5'])}
    </Table.Head>
    <Table.Body>{@render bodyRows(50)}</Table.Body>
  </Table>
{/snippet}

{#snippet WithBorder()}
  <Table border>
    <Table.Body>{@render bodyRows(3)}</Table.Body>
    <Table.Body>{@render bodyRows(3)}</Table.Body>
  </Table>
  <Table border>
    <Table.Head>{@render headerRow(['Header 3', 'Header 4', 'Header 5'])}</Table.Head>
    <Table.Body>{@render bodyRows(3)}</Table.Body>
  </Table>
  <Table border>
    <Table.Body>{@render bodyRows(3)}</Table.Body>
    <Table.Foot>{@render headerRow(['Footer 1', 'Footer 2', 'Footer 3'])}</Table.Foot>
  </Table>
{/snippet}
