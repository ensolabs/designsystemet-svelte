import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
import type { Content as ContentType, DefaultProps } from '../types';
type Common = DefaultProps & {
    label?: ContentType;
    description?: ContentType;
    error?: ContentType;
    prefix?: string;
    suffix?: string;
    counter?: number | {
        limit: number;
        under?: string;
        over?: string;
    };
    ref?: HTMLInputElement | HTMLTextAreaElement;
};
/** Input attributes; with `multiline`, they go on a textarea instead. */
type Props = Common & Omit<HTMLInputAttributes, 'prefix' | 'size' | 'autofocus'> & {
    multiline?: boolean;
    size?: number | null;
    autofocus?: boolean | string | null;
} & Pick<HTMLTextareaAttributes, 'rows' | 'cols' | 'wrap'>;
declare const Textfield: import("svelte").Component<Props, {}, "ref" | "value">;
type Textfield = ReturnType<typeof Textfield>;
export default Textfield;
