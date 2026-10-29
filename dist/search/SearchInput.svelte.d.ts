import type { HTMLInputAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'readonly' | 'type' | 'size'> & {
    type?: 'text' | 'search';
    size?: number | null;
    ref?: HTMLInputElement;
};
declare const SearchInput: import("svelte").Component<Props, {}, "ref" | "value">;
type SearchInput = ReturnType<typeof SearchInput>;
export default SearchInput;
