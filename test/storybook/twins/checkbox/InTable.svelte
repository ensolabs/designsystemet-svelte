<!-- InTable: a checkbox per row, bound to one array, and a "select all" checkbox in the header that is checked when
     every row is and indeterminate when some are. -->
<script lang="ts">
  import { Checkbox, Table } from '../../../../src';
  import { tableData } from './people';

  const id = $props.id();
  const ids = tableData.map((person) => `${person.id}`);
  let value = $state(['2', '3']);
  const all = $derived(ids.every((v) => value.includes(v)));
  const some = $derived(ids.some((v) => value.includes(v)));
  // A checkbox's indeterminate state is a property, not an attribute: set it on the element, as useCheckboxGroup does.
  let selectAll = $state<HTMLInputElement>();
  $effect(() => {
    if (selectAll) selectAll.indeterminate = some && !all;
  });
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
        <Checkbox
          aria-label="Velg alle"
          name={id}
          value="all"
         
          checked={all}
          bind:ref={selectAll}
          onchange={() => (value = all ? [] : ids)}
        />
      </Table.HeaderCell>
      <Table.HeaderCell>Navn</Table.HeaderCell>
      <Table.HeaderCell>E-post</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {#each tableData as person (person.id)}
      <Table.Row>
        <Table.Cell>
          <Checkbox
            aria-labelledby="{id}-{person.id}-name"
            name={id}
            value={`${person.id}`}
            bind:group={value}
           
          />
        </Table.Cell>
        <Table.Cell id="{id}-{person.id}-name">{person.navn}</Table.Cell>
        <Table.Cell>{person.epost}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
