import ComboboxRoot from './Combobox.svelte';
import ComboboxEmpty from './ComboboxEmpty.svelte';
import ComboboxOption from './ComboboxOption.svelte';
/** Deprecated upstream: use EXPERIMENTAL_Suggestion. */
const Combobox = Object.assign(ComboboxRoot, { Option: ComboboxOption, Empty: ComboboxEmpty });
export { Combobox, ComboboxEmpty, ComboboxOption };
