import { type Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content } from '../types';
import { type ComboboxItem } from './context';
type Props = Omit<HTMLInputAttributes, 'size' | 'value' | 'children'> & {
    /** The label, in a `label` element. */
    label?: Content;
    /** Visually hides `label` and `description` (still read by screen readers). */
    hideLabel?: boolean;
    /** The selected values; one at most without `multiple`. Bindable. */
    value?: string[];
    /** The values selected at first. */
    initialValue?: string[];
    /** Called with the selected values when they change. */
    onValueChange?: (value: string[]) => void;
    /** Lets the user select several options. */
    multiple?: boolean;
    /** The name of a hidden `select` with the selected values, for forms. */
    name?: string;
    /** The input's `size` attribute. */
    htmlSize?: number;
    /** Hides the chips of the selected options (with `multiple`). */
    hideChips?: boolean;
    /** Hides the button that clears the selection. */
    hideClearButton?: boolean;
    /** The label of the clear button. Default `Fjern alt`. */
    clearButtonLabel?: string;
    /** Renders only the visible options of the list (with @tanstack/virtual-core). */
    virtual?: boolean;
    /** The text in the input. */
    inputValue?: string;
    /** Sets `aria-busy`, and shows `loadingLabel` with a spinner instead of the options. */
    loading?: boolean;
    /** Default `Laster...`. */
    loadingLabel?: string;
    /** Whether an option matches the typed text. Default: its label starts with the text, ignoring case. */
    filter?: (inputValue: string, option: ComboboxItem) => boolean;
    /** The screen reader label of a chip. Default `Slett <label>`. */
    chipSrLabel?: (option: ComboboxItem) => string;
    /** Puts the list at the end of `body`; `false` puts it at the end of the Combobox. Default `true`. */
    portal?: boolean;
    error?: Content;
    errorId?: string;
    description?: Content;
    /** Default `md`. */
    size?: 'sm' | 'md' | 'lg' | (string & {});
    children?: Snippet;
    /** The input. */
    ref?: HTMLInputElement;
};
declare const Combobox: import("svelte").Component<Props, {}, "ref" | "value">;
type Combobox = ReturnType<typeof Combobox>;
export default Combobox;
