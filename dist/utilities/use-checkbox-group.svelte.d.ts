import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content } from '../types';
export type UseCheckboxGroupProps = {
    /** Disables all checkboxes in the group. */
    disabled?: boolean;
    /** Error message for the group. If set, all checkboxes get `aria-invalid="true"`. */
    error?: Content;
    /** Name of the group. If not set, an id is generated. */
    name?: string;
    /** Makes all checkboxes in the group read-only. */
    readonly?: boolean;
    /** Initial value of the group. Default `[]`. */
    value?: string[];
    /** Makes all checkboxes in the group required. */
    required?: boolean;
    /** Called when the value of the group changes. */
    onChange?: (nextValue: string[], currentValue: string[]) => void;
    /** If outline, all checkboxes in the group have a border. */
    variant?: 'outline';
};
/** What can be set on one checkbox; the group sets the rest. */
export type GetCheckboxProps = Omit<HTMLInputAttributes, 'type' | 'role' | 'size' | 'aria-label' | 'aria-labelledby' | 'checked' | 'value' | 'prefix'> & {
    /** Makes this the "select all" checkbox: checked when all others are, indeterminate when some are. */
    allowIndeterminate?: boolean;
    /** Called with the input, and with `null` when it goes away, as React's callback ref. */
    ref?: (element: HTMLInputElement | null) => void;
    checked?: boolean;
    value?: string;
    'data-size'?: string;
    'data-color'?: string;
    variant?: 'outline';
    position?: 'start' | 'end';
    description?: Content;
    [key: symbol]: unknown;
};
export declare function useCheckboxGroup(props?: UseCheckboxGroupProps): {
    /** The current value of the group. */
    readonly value: string[];
    /** Sets the value of the group: a value, or a function of the current one. */
    setValue(value: string[] | ((current: string[]) => string[])): void;
    /**
     * Attributes to spread on a Checkbox, from its value or from an object of its own attributes.
     *
     * @example <Checkbox {...getCheckboxProps('value')} />
     * @example <Checkbox {...getCheckboxProps({ value: 'all', allowIndeterminate: true })} />
     */
    getCheckboxProps(propsOrValue?: string | GetCheckboxProps): Omit<GetCheckboxProps, "ref" | "allowIndeterminate">;
    /** Attributes to spread on the group's ValidationMessage. */
    readonly validationMessageProps: {
        children: Content | undefined;
        hidden: boolean;
        id: string;
    };
};
