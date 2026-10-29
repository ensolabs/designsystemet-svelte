import type { HTMLTextareaAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLTextareaAttributes, 'autofocus'> & {
    autofocus?: boolean | string | null;
    ref?: HTMLTextAreaElement;
};
declare const Textarea: import("svelte").Component<Props, {}, "ref" | "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
