import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement;
};
declare const Alert: import("svelte").Component<Props, {}, "ref">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
