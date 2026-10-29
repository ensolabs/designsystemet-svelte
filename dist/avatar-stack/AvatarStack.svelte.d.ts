import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLUListElement> & {
    gap?: string;
    avatarSize?: string;
    overlap?: number | string;
    suffix?: string;
    expandable?: 'fixed' | boolean;
    ref?: HTMLUListElement;
};
declare const AvatarStack: import("svelte").Component<Props, {}, "ref">;
type AvatarStack = ReturnType<typeof AvatarStack>;
export default AvatarStack;
