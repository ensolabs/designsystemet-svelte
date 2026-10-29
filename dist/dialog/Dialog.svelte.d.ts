import type { HTMLDialogAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLDialogAttributes, 'open' | 'closedby'> & {
    closeButton?: string | false;
    closedby?: 'none' | 'closerequest' | 'any';
    placement?: 'center' | 'left' | 'right' | 'top' | 'bottom';
    modal?: boolean;
    open?: boolean;
    onClose?: (event: Event) => void;
    ref?: HTMLDialogElement;
};
declare const Dialog: import("svelte").Component<Props, {}, "ref" | "open">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;
