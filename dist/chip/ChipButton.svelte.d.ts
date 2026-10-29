import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLButtonAttributes & {
    'data-wrap'?: 'nowrap' | 'wrap';
    child?: ChildSnippet;
    ref?: HTMLButtonElement;
};
declare const ChipButton: import("svelte").Component<Props, {}, "ref">;
type ChipButton = ReturnType<typeof ChipButton>;
export default ChipButton;
