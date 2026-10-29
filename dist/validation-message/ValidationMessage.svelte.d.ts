import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, Content as ContentType, DefaultProps } from '../types';
type Props = DefaultProps & Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
    children?: ContentType;
    child?: ChildSnippet;
    ref?: HTMLParagraphElement;
};
declare const ValidationMessage: import("svelte").Component<Props, {}, "ref">;
type ValidationMessage = ReturnType<typeof ValidationMessage>;
export default ValidationMessage;
