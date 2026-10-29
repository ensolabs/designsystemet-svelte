/**
 * React's `useCheckboxGroup`, with runes. Call it while a component initializes, as a React hook during render:
 *
 * ```svelte
 * <script lang="ts">
 *   const group = useCheckboxGroup({ value: ['epost'], error: 'Velg minst én' });
 * </script>
 *
 * <Fieldset>
 *   <Checkbox label="E-post" {...group.getCheckboxProps('epost')} />
 *   <Checkbox label="SMS" {...group.getCheckboxProps('sms')} />
 *   <ValidationMessage {...group.validationMessageProps} />
 * </Fieldset>
 * <p>{group.value.join(', ')}</p>
 * ```
 *
 * The same arguments and the same return shape as React, read the Svelte way:
 * - `value` is a getter (don't destructure it), and `setValue` takes a value or an updater, as React's setter.
 * - The options are read when they are used, so pass a `$state` object or getters to change `error`, `disabled` and so
 *   on later; `value` is the initial value, as in React.
 * - `getCheckboxProps` returns the attributes to spread on a Checkbox, with Svelte's names (`readonly`, `onchange`).
 *   React's `ref` becomes an attachment in the result; a `ref` callback in the argument is still called with the input.
 * - `validationMessageProps.children` is the error as given (text or a snippet); ValidationMessage takes both.
 */
import { untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { useId } from './use-id';
const toggleIndeterminate = (getIndeterminateInputs, getInputs) => {
    const inputs = getIndeterminateInputs();
    const checked = !!getInputs(true).length;
    const unchecked = !!getInputs(false).length;
    for (const input of inputs) {
        input.indeterminate = unchecked && checked;
        input.checked = !unchecked && checked;
    }
};
export function useCheckboxGroup(props) {
    let groupValue = $state(untrack(() => props?.value ?? []));
    const namedId = useId();
    const errorId = useId();
    const attachment = createAttachmentKey();
    const checkboxRefs = new Set();
    const indeterminateRefs = new Set();
    const inputRefs = new Map();
    const getInputs = (checked) => Array.from(checkboxRefs.values()).filter((input) => input.checked === checked);
    const getIndeterminateInputs = () => Array.from(indeterminateRefs.values());
    // React's onChange gets the value of the last render as the current value: the value before the event, for every
    // change in it ("select all" clicks the other checkboxes in one go, and React renders after the event). Svelte updates
    // between those clicks, so keep the value from the first change until the event is over.
    let snapshot;
    const renderedValue = () => {
        if (!snapshot) {
            snapshot = groupValue;
            queueMicrotask(() => (snapshot = undefined));
        }
        return snapshot;
    };
    // React's useEffect(…, [groupValue]).
    $effect(() => {
        void groupValue;
        untrack(() => toggleIndeterminate(getIndeterminateInputs, getInputs));
    });
    return {
        /** The current value of the group. */
        get value() {
            return groupValue;
        },
        /** Sets the value of the group: a value, or a function of the current one. */
        setValue(value) {
            groupValue = typeof value === 'function' ? value(groupValue) : value;
        },
        /**
         * Attributes to spread on a Checkbox, from its value or from an object of its own attributes.
         *
         * @example <Checkbox {...getCheckboxProps('value')} />
         * @example <Checkbox {...getCheckboxProps({ value: 'all', allowIndeterminate: true })} />
         */
        getCheckboxProps(propsOrValue) {
            const { error, name: groupName, onChange, disabled, readonly, required } = props || {};
            let groupProps;
            if (props) {
                const { onChange: _onChange, error: _error, ...rest } = props;
                groupProps = rest;
            }
            const { allowIndeterminate = false, ref: forwardedRef = undefined, value = '', ...rest } = typeof propsOrValue === 'string' ? { value: propsOrValue } : propsOrValue || {};
            // React's callback ref: an attachment, run when the input is there and cleaned up when it goes.
            const handleRef = (element) => {
                (allowIndeterminate ? indeterminateRefs : checkboxRefs).add(element);
                inputRefs.set(value, element);
                if (getIndeterminateInputs().length)
                    toggleIndeterminate(getIndeterminateInputs, getInputs);
                forwardedRef?.(element);
                return () => {
                    const oldElement = inputRefs.get(value);
                    if (oldElement) {
                        checkboxRefs.delete(oldElement);
                        indeterminateRefs.delete(oldElement);
                        inputRefs.delete(value);
                    }
                    forwardedRef?.(null);
                };
            };
            const handleChange = () => {
                const currentValue = renderedValue();
                const nextGroupValue = Array.from(getInputs(true), ({ value }) => value);
                groupValue = nextGroupValue;
                onChange?.(nextGroupValue, currentValue);
            };
            const indeterminateChange = () => {
                const element = inputRefs.get(value);
                if (!element)
                    return;
                const checked = !!element.checked;
                for (const input of getInputs(!checked))
                    input.click();
            };
            return {
                ...groupProps,
                ...rest,
                'aria-describedby': `${error ? errorId : ''} ${rest['aria-describedby'] || ''}`.trim() || undefined,
                'aria-invalid': !!error || rest['aria-invalid'],
                checked: allowIndeterminate ? undefined : groupValue.includes(value),
                name: rest.name || groupName || namedId,
                onchange: (event) => {
                    rest.onchange?.(event);
                    if (event.defaultPrevented)
                        return;
                    if (allowIndeterminate)
                        indeterminateChange();
                    handleChange();
                },
                [attachment]: handleRef,
                value,
                disabled: disabled || rest.disabled,
                readonly: readonly || rest.readonly,
                required: required || rest.required,
            };
        },
        /** Attributes to spread on the group's ValidationMessage. */
        get validationMessageProps() {
            const error = props?.error;
            return { children: error, hidden: !error, id: errorId };
        },
    };
}
