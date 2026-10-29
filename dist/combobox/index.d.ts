import ComboboxEmpty from './ComboboxEmpty.svelte';
import ComboboxOption from './ComboboxOption.svelte';
/** Deprecated upstream: use EXPERIMENTAL_Suggestion. */
declare const Combobox: import("svelte").Component<Omit<import("svelte/elements").HTMLInputAttributes, "children" | "value" | "size"> & {
    label?: import("..").Content;
    hideLabel?: boolean;
    value?: string[];
    initialValue?: string[];
    onValueChange?: (value: string[]) => void;
    multiple?: boolean;
    name?: string;
    htmlSize?: number;
    hideChips?: boolean;
    hideClearButton?: boolean;
    clearButtonLabel?: string;
    virtual?: boolean;
    inputValue?: string;
    loading?: boolean;
    loadingLabel?: string;
    filter?: (inputValue: string, option: import("./context").ComboboxItem) => boolean;
    chipSrLabel?: (option: import("./context").ComboboxItem) => string;
    portal?: boolean;
    error?: import("..").Content;
    errorId?: string;
    description?: import("..").Content;
    size?: "sm" | "md" | "lg" | (string & {});
    children?: import("svelte").Snippet;
    ref?: HTMLInputElement;
}, {}, "ref" | "value"> & {
    Option: import("svelte").Component<import("./context").ComboboxOptionProps, {}, "ref">;
    Empty: import("svelte").Component<import("svelte/elements").HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
    }, {}, "ref">;
};
export type { ComboboxItem, ComboboxOptionProps } from './context';
export { Combobox, ComboboxEmpty, ComboboxOption };
