<!-- The Preview story: the pizza radio group from useRadioGroup. -->
<script lang="ts">
  import { Fieldset, Radio, useRadioGroup } from '../../../../src';

  const { getRadioProps } = useRadioGroup({});
</script>

<Fieldset>
  <Fieldset.Legend>Velg pizza</Fieldset.Legend>
  <Fieldset.Description>
    Alle pizzaene er laget på våre egne nybakte bunner og serveres med kokkens egen osteblanding og tomatsaus.
  </Fieldset.Description>
  <Radio label="Bare ost" {...getRadioProps('ost')} />
  <Radio label="Dobbeldekker" description="Chorizo spesial med kokkens luksuskylling" {...getRadioProps('dobbeldekker')} />
  <Radio label="Flammen" {...getRadioProps('flammen')} />
  <Radio label="Snadder" {...getRadioProps('snadder')} />
</Fieldset>
