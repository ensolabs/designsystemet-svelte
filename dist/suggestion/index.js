import Suggestion from './Suggestion.svelte';
import SuggestionClear from './SuggestionClear.svelte';
import SuggestionEmpty from './SuggestionEmpty.svelte';
import SuggestionInput from './SuggestionInput.svelte';
import SuggestionList from './SuggestionList.svelte';
import SuggestionOption from './SuggestionOption.svelte';
import SuggestionToggle from './SuggestionToggle.svelte';
/** Experimental upstream, hence the name. */
const EXPERIMENTAL_Suggestion = Object.assign(Suggestion, {
    List: SuggestionList,
    Input: SuggestionInput,
    Empty: SuggestionEmpty,
    Option: SuggestionOption,
    Toggle: SuggestionToggle,
    Clear: SuggestionClear,
});
export { EXPERIMENTAL_Suggestion, SuggestionClear as EXPERIMENTAL_SuggestionClear, SuggestionEmpty as EXPERIMENTAL_SuggestionEmpty, SuggestionInput as EXPERIMENTAL_SuggestionInput, SuggestionList as EXPERIMENTAL_SuggestionList, SuggestionOption as EXPERIMENTAL_SuggestionOption, SuggestionToggle as EXPERIMENTAL_SuggestionToggle, };
