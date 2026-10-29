import type { HTMLButtonAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLButtonAttributes & {
    ref?: HTMLButtonElement;
};
declare const SearchClear: import("svelte").Component<Props, {}, "ref">;
type SearchClear = ReturnType<typeof SearchClear>;
export default SearchClear;
