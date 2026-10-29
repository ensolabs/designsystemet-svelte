<!-- Controlled: the pizza group from useRadioGroup, the choice shown, and buttons that set it with setValue. -->
<script lang="ts">
  import { Button, Divider, Fieldset, Paragraph, Radio, useRadioGroup } from '../../../../src';

  const group = useRadioGroup({});
  const { setValue, getRadioProps } = group;
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

<Divider style="margin-top: var(--ds-size-4)" />

<Paragraph style="margin-block: var(--ds-size-2)">Du har valgt: {group.value}</Paragraph>
<div style="display: flex; gap: 1rem">
  <Button onclick={() => setValue('flammen')}>Velg Flammen</Button>
  <Button onclick={() => setValue('snadder')}>Velg Snadder</Button>
</div>
