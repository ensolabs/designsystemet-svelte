import SelectOptgroup from './SelectOptgroup.svelte';
import SelectOption from './SelectOption.svelte';
import SelectRoot from './Select.svelte';
const Select = Object.assign(SelectRoot, { Option: SelectOption, Optgroup: SelectOptgroup });
export { Select, SelectOptgroup, SelectOption };
