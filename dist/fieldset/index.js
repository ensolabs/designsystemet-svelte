import FieldsetRoot from './Fieldset.svelte';
import FieldsetDescription from './FieldsetDescription.svelte';
import FieldsetLegend from './FieldsetLegend.svelte';
const Fieldset = Object.assign(FieldsetRoot, { Legend: FieldsetLegend, Description: FieldsetDescription });
export { Fieldset, FieldsetDescription, FieldsetLegend };
