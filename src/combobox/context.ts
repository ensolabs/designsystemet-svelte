import { getContext, setContext, type Snippet } from 'svelte';
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
  /** The option's props, for the rows of a virtual list, which Combobox renders itself. */
  readonly props: ComboboxOptionProps;
  readonly children: Snippet | undefined;
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

const KEY = Symbol('combobox');
const MODE = Symbol('combobox-mode');

/**
 * Combobox renders its children twice. `collect`: always, and nothing shows; the options register, as React reads its
 * children's props. `list`: in the open list, where Combobox.Option and Combobox.Empty render.
 */
export type Mode = 'collect' | 'list';

export const setComboboxContext = (context: ComboboxContext) => setContext(KEY, context);

export function getComboboxContext(name: string): ComboboxContext {
  const context = getContext<ComboboxContext | undefined>(KEY);
  if (!context) throw new Error(`${name} must be used within a Combobox`);
  return context;
}

export const setMode = (mode: Mode) => setContext(MODE, mode);
export const getMode = () => getContext<Mode>(MODE);

const INTERNAL_OPTION_PREFIX = 'internal-option-';
/** Prefixes option values, so values that look like numbers keep their order as object keys. */
export const prefix = (value: string) => INTERNAL_OPTION_PREFIX + value;
export const removePrefix = (value: string) => value.slice(16);
