import type { HTMLOptionAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLOptionAttributes & {
    child?: ChildSnippet;
    ref?: HTMLOptionElement;
};
declare const SelectOption: import("svelte").Component<Props, {}, "ref">;
type SelectOption = ReturnType<typeof SelectOption>;
export default SelectOption;
