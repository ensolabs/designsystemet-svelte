import type { DSSuggestionElement } from '@digdir/designsystemet-web';
import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<DSSuggestionElement> & {
    ref?: DSSuggestionElement;
};
declare const Search: import("svelte").Component<Props, {}, "ref">;
type Search = ReturnType<typeof Search>;
export default Search;
