<!-- The pizza radio group of useRadioGroup's Preview and Controlled, bound to one value with bind:group. -->
<script lang="ts">
  import { Fieldset, Radio } from '../../../../src';

  let { value = $bindable('') }: { value?: string } = $props();
  const name = $props.id();
</script>

<Fieldset>
  <Fieldset.Legend>Velg pizza</Fieldset.Legend>
  <Fieldset.Description>
    Alle pizzaene er laget på våre egne nybakte bunner og serveres med kokkens egen osteblanding og tomatsaus.
  </Fieldset.Description>
  <Radio label="Bare ost" {name} value="ost" bind:group={value} />
  <Radio
    label="Dobbeldekker"
    description="Chorizo spesial med kokkens luksuskylling"
    {name}
    value="dobbeldekker"
    bind:group={value}
  />
  <Radio label="Flammen" {name} value="flammen" bind:group={value} />
  <Radio label="Snadder" {name} value="snadder" bind:group={value} />
</Fieldset>
