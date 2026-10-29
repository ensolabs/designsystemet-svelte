import FieldRoot from './Field.svelte';
import FieldAffix from './FieldAffix.svelte';
import FieldAffixes from './FieldAffixes.svelte';
import FieldCounter from './FieldCounter.svelte';
import FieldDescription from './FieldDescription.svelte';

const Field = Object.assign(FieldRoot, {
  Description: FieldDescription,
  Affixes: FieldAffixes,
  Affix: FieldAffix,
  Counter: FieldCounter,
});

export { Field, FieldAffix, FieldAffixes, FieldCounter, FieldDescription };
