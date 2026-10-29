import type { DSSuggestionElement } from '@digdir/designsystemet-web';
/** A selected value, with the text shown for it. */
export type SuggestionItem = {
    label: string;
    value: string;
};
/** The `comboboxbeforematch` event: `detail` is the option that matches the typed text. Cancel it to keep the selection. */
export type EventBeforeMatch = Omit<CustomEvent<HTMLOptionElement | undefined>, 'currentTarget'> & {
    currentTarget: DSSuggestionElement;
};
/** Whether to show an option for the typed text. */
export type Filter = (args: {
    /** Index of the `option`. */
    index: number;
    /** Label content of the `option`. */
    label: string;
    /** Text content of the `option`. */
    text: string;
    /** Value of the `option`. */
    value: string;
    /** The DOM element of the `option`. */
    optionElement: HTMLOptionElement;
    /** The DOM element of the `input`. */
    input: HTMLInputElement;
}) => boolean;
