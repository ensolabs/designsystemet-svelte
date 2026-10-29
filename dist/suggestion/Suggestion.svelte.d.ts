import type { DSSuggestionElement } from '@digdir/designsystemet-web';
import { type Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
import type { EventBeforeMatch, Filter, SuggestionItem } from './types';
type Value = string | SuggestionItem;
type Props = DefaultProps & HTMLAttributes<DSSuggestionElement> & {
    /** Filter options: `true` matches the label against the typed text; a function decides itself. Default `true`. */
    filter?: boolean | Filter;
    /** Lets the user create new items. */
    creatable?: boolean;
    /** Called when the typed text is matched against the options. */
    onBeforeMatch?: (event: EventBeforeMatch) => void;
    /** The name of a hidden `select` with the selected values, for forms. */
    name?: string;
    /** Renders a selected item (in a chip with `multiple`). Default: its label. */
    renderSelected?: Snippet<[SuggestionItem]>;
    ref?: DSSuggestionElement;
} & ({
    multiple?: false;
    /** The selected item: controls the Suggestion. */
    selected?: Value | null;
    /** The item selected at first, when `selected` isn't given. */
    defaultSelected?: Value;
    onSelectedChange?: (value: SuggestionItem | null) => void;
} | {
    /** Lets the user select several items. */
    multiple: true;
    /** The selected items: control the Suggestion. */
    selected?: Value[] | null;
    /** The items selected at first, when `selected` isn't given. */
    defaultSelected?: Value[];
    onSelectedChange?: (value: SuggestionItem[]) => void;
});
declare const Suggestion: import("svelte").Component<Props, {}, "ref" | "selected">;
type Suggestion = ReturnType<typeof Suggestion>;
export default Suggestion;
