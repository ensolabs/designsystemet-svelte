import type { HTMLInputAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLInputAttributes, 'size' | 'role'> & {
    size?: number | null;
    ref?: HTMLInputElement;
};
declare const SuggestionInput: import("svelte").Component<Props, {}, "ref">;
type SuggestionInput = ReturnType<typeof SuggestionInput>;
export default SuggestionInput;
