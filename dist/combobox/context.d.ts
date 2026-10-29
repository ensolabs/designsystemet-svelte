import { type Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
/** An option as Combobox knows it: what `filter`, `chipSrLabel` and the chips get, as React's `Option`. */
export type ComboboxItem = {
    value: string;
    /** `displayValue`, or the option's text. */
    label: string;
    displayValue?: string;
    description?: string;
};
export type ComboboxOptionProps = Omit<HTMLButtonAttributes, 'value'> & {
    /** The value returned when the option is selected. */
    value: string;
    /** Text under the label. */
    description?: string;
    /** The text shown in the input or in the chips when the option is selected. Required if the children are not text. */
    displayValue?: string;
    ref?: HTMLButtonElement;
};
/** A Combobox.Option, as it registers with its Combobox. */
export type OptionEntry = {
    readonly key: string;
    readonly item: ComboboxItem;
    /** The option's props: Combobox renders the option's button in its list itself, after the other children, as React
     * renders `filteredOptionsChildren` after `restChildren`. */
    readonly props: ComboboxOptionProps;
    readonly children: Snippet | undefined;
    /** Where the option is among the children (in the `collect` pass), so the options keep their order. */
    readonly node: Node | undefined;
    /** The button rendered for it, for the option's `bind:ref`. */
    ref: HTMLButtonElement | undefined;
};
export type ComboboxContext = {
    readonly size: string;
    readonly multiple: boolean;
    readonly virtual: boolean;
    readonly selectedOptions: Record<string, ComboboxItem>;
    /** The keys (`prefix(value)`) of the options that pass the filter, in order. */
    readonly filteredOptions: string[];
    readonly activeIndex: number;
    register: (entry: OptionEntry) => () => void;
    onOptionClick: (value: string) => void;
    setListRef: (index: number, node: HTMLElement | null) => void;
    /** useListNavigation's item handlers: focus or pointer movement makes the item active. */
    syncItem: (node: HTMLElement) => void;
};
/**
 * Combobox renders its children twice. `collect`: always, apart from the page (on an element that isn't in the document,
 * or on the server to HTML that is dropped); the options register, as React reads its children's props. `list`: in the
 * open list, where Combobox.Empty and the other children render, and Combobox renders the options' buttons after them.
 */
export type Mode = 'collect' | 'list';
export declare const setComboboxContext: (context: ComboboxContext) => ComboboxContext;
export declare function getComboboxContext(name: string): ComboboxContext;
export declare const setMode: (mode: Mode) => Mode;
export declare const getMode: () => Mode;
/** Prefixes option values, so values that look like numbers keep their order as object keys. */
export declare const prefix: (value: string) => string;
export declare const removePrefix: (value: string) => string;
