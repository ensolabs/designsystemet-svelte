/**
 * React's `useRadioGroup`, with runes. Call it while a component initializes, as a React hook during render:
 *
 * ```svelte
 * <script lang="ts">
 *   const group = useRadioGroup({ name: 'pizza', value: 'ost' });
 * </script>
 *
 * <Fieldset>
 *   <Radio label="Bare ost" {...group.getRadioProps('ost')} />
 *   <Radio label="Flammen" {...group.getRadioProps('flammen')} />
 *   <ValidationMessage {...group.validationMessageProps} />
 * </Fieldset>
 * <p>Du har valgt: {group.value}</p>
 * ```
 *
 * The same arguments and the same return shape as React, read the Svelte way:
 * - `value` is a getter (don't destructure it), and `setValue` takes a value or an updater, as React's setter.
 * - The options are read when they are used, so pass a `$state` object or getters to change `error`, `disabled` and so
 *   on later; `value` is the initial value, as in React.
 * - `getRadioProps` returns the attributes to spread on a Radio, with Svelte's names (`readonly`, `onchange`). As in
 *   React the radios aren't controlled by a `checked` attribute: React's `ref` (here an attachment) checks the radio
 *   whose value is the group's, every time the group's value changes. A `ref` callback in the argument is still called
 *   with the input.
 * - `validationMessageProps.children` is the error as given (text or a snippet); ValidationMessage takes both.
 */
import { untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { Content } from '../types';
import { useId } from './use-id';

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

export function useRadioGroup(props?: UseRadioGroupProps) {
  let groupValue = $state(untrack(() => props?.value ?? ''));
  const errorId = useId();
  const namedId = useId();
  const attachment = createAttachmentKey();

  return {
    /** The current value of the group. */
    get value() {
      return groupValue;
    },
    /** Sets the value of the group: a value, or a function of the current one. */
    setValue(value: string | ((current: string) => string)) {
      groupValue = typeof value === 'function' ? value(groupValue) : value;
    },
    /**
     * Attributes to spread on a Radio, from its value or from an object of its own attributes.
     *
     * @example <Radio label="Option 1" {...getRadioProps('option-1')} />
     */
    getRadioProps(propsOrValue: string | GetRadioProps): Omit<GetRadioProps, 'ref'> & { name: string } {
      const { error, readonly, required, disabled, name, onChange } = props || {};
      const radioGroupName = name || namedId;
      let groupProps: Omit<UseRadioGroupProps, 'onChange' | 'error'> | undefined;
      if (props) {
        const { onChange: _onChange, error: _error, ...rest } = props;
        groupProps = rest;
      }
      const { ref: forwardedRef = undefined, value = '', ...rest } = typeof propsOrValue === 'string' ? ({ value: propsOrValue } as GetRadioProps) : propsOrValue;

      // React's callback ref, which React calls again after every render: here it runs again when the value changes.
      const handleRef = (element: HTMLInputElement) => {
        element.checked = value === groupValue;
        untrack(() => forwardedRef?.(element));
        return () => forwardedRef?.(null);
      };
      const handleChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.name === radioGroupName) {
          const prevValue = groupValue;
          onChange?.(target.value, prevValue);
          groupValue = target.value;
        }
      };

      return {
        ...groupProps,
        ...rest,
        name: radioGroupName,
        'aria-describedby': `${error ? errorId : ''} ${rest['aria-describedby'] || ''}`.trim() || undefined,
        'aria-invalid': !!error || rest['aria-invalid'],
        value,
        [attachment]: handleRef,
        required: required || rest.required,
        readonly: readonly || rest.readonly,
        disabled: disabled || rest.disabled,
        onchange: (event) => {
          rest.onchange?.(event);
          if (event.defaultPrevented) return;
          handleChange(event);
        },
      };
    },
    /** Attributes to spread on the group's ValidationMessage. */
    get validationMessageProps() {
      const error = props?.error;
      return { children: error, hidden: !error, id: errorId };
    },
  };
}
