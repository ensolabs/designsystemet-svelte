import SearchRoot from './Search.svelte';
import SearchButton from './SearchButton.svelte';
import SearchClear from './SearchClear.svelte';
import SearchInput from './SearchInput.svelte';
const Search = Object.assign(SearchRoot, { Clear: SearchClear, Button: SearchButton, Input: SearchInput });
export { Search, SearchButton, SearchClear, SearchInput };
