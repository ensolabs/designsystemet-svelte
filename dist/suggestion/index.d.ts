import SuggestionClear from './SuggestionClear.svelte';
import SuggestionEmpty from './SuggestionEmpty.svelte';
import SuggestionInput from './SuggestionInput.svelte';
import SuggestionList from './SuggestionList.svelte';
import SuggestionOption from './SuggestionOption.svelte';
import SuggestionToggle from './SuggestionToggle.svelte';
/** Experimental upstream, hence the name. */
declare const EXPERIMENTAL_Suggestion: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<import("@digdir/designsystemet-web").DSSuggestionElement> & ({
    filter?: boolean | import("./types").Filter;
    creatable?: boolean;
    onBeforeMatch?: (event: import("./types").EventBeforeMatch) => void;
    name?: string;
    renderSelected?: import("svelte").Snippet<[import("./types").SuggestionItem]>;
    ref?: import("@digdir/designsystemet-web").DSSuggestionElement;
} & ({
    multiple?: false;
    selected?: (string | import("./types").SuggestionItem) | null;
    defaultSelected?: string | import("./types").SuggestionItem;
    onSelectedChange?: (value: import("./types").SuggestionItem | null) => void;
} | {
    multiple: true;
    selected?: (string | import("./types").SuggestionItem)[] | null;
    defaultSelected?: (string | import("./types").SuggestionItem)[];
    onSelectedChange?: (value: import("./types").SuggestionItem[]) => void;
})), {}, "ref" | "selected"> & {
    List: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLAttributes<HTMLDataListElement>, "autoPlacement"> & {
        singular?: string;
        plural?: string;
        autoPlacement?: boolean;
        ref?: HTMLDataListElement;
    }, {}, "ref">;
    Input: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLInputAttributes, "role" | "size"> & {
        size?: number | null;
        ref?: HTMLInputElement;
    }, {}, "ref">;
    Empty: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLOptionAttributes & {
        'data-empty'?: string | boolean;
        ref?: HTMLOptionElement;
    }, {}, "ref">;
    Option: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLOptionAttributes & {
        ref?: HTMLOptionElement;
    }, {}, "ref">;
    Toggle: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLButtonAttributes & {
        ref?: HTMLButtonElement;
    }, {}, "ref">;
    Clear: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLButtonAttributes & {
        ref?: HTMLButtonElement;
    }, {}, "ref">;
};
export type { EventBeforeMatch, Filter, SuggestionItem } from './types';
export { EXPERIMENTAL_Suggestion, SuggestionClear as EXPERIMENTAL_SuggestionClear, SuggestionEmpty as EXPERIMENTAL_SuggestionEmpty, SuggestionInput as EXPERIMENTAL_SuggestionInput, SuggestionList as EXPERIMENTAL_SuggestionList, SuggestionOption as EXPERIMENTAL_SuggestionOption, SuggestionToggle as EXPERIMENTAL_SuggestionToggle, };
