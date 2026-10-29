import type { HTMLInputAttributes, HTMLLabelAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLLabelAttributes & Pick<HTMLInputAttributes, 'formaction' | 'formenctype' | 'formtarget' | 'formmethod' | 'required' | 'formnovalidate' | 'disabled' | 'readonly'> & {
    value?: string;
    /** Accepted for React parity; React ignores it too. */
    icon?: boolean;
    ref?: HTMLLabelElement;
};
declare const ToggleGroupItem: import("svelte").Component<Props, {}, "ref">;
type ToggleGroupItem = ReturnType<typeof ToggleGroupItem>;
export default ToggleGroupItem;
