import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content } from '../types';
export type UseRadioGroupProps = {
    /** Set disabled state of all radios. */
    disabled?: boolean;
    /** Shared error message for all radios. */
    error?: Content;
    /** Name of all radios. Default: a generated id. */
    name?: string;
    /** Set read only state of all radios. */
    readonly?: boolean;
    /** Set required state of all radios. */
    required?: boolean;
    /** Initial value of the group. */
    value?: string;
    /** Called when the selected radio changes. */
    onChange?: (nextValue: string, prevValue: string) => void;
    /** If outline, all radios in the group have a border. */
    variant?: 'outline';
};
/** What can be set on one radio; the group sets the rest. */
export type GetRadioProps = Omit<HTMLInputAttributes, 'type' | 'role' | 'size' | 'aria-label' | 'aria-labelledby' | 'name' | 'checked' | 'value' | 'prefix'> & {
    /** Called with the input, and with `null` when it goes away, as React's callback ref. */
    ref?: (element: HTMLInputElement | null) => void;
    value?: string;
    'data-size'?: string;
    'data-color'?: string;
    variant?: 'outline';
    position?: 'start' | 'end';
    description?: Content;
    [key: symbol]: unknown;
};
export declare function useRadioGroup(props?: UseRadioGroupProps): {
    /** The current value of the group. */
    readonly value: string;
    /** Sets the value of the group: a value, or a function of the current one. */
    setValue(value: string | ((current: string) => string)): void;
    /**
     * Attributes to spread on a Radio, from its value or from an object of its own attributes.
     *
     * @example <Radio label="Option 1" {...getRadioProps('option-1')} />
     */
    getRadioProps(propsOrValue: string | GetRadioProps): Omit<GetRadioProps, "ref"> & {
        name: string;
    };
    /** Attributes to spread on the group's ValidationMessage. */
    readonly validationMessageProps: {
        children: Content | undefined;
        hidden: boolean;
        id: string;
    };
};
