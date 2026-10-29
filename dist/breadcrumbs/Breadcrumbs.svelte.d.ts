import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLElement> & {
    'aria-label'?: string;
    ref?: HTMLElement;
};
declare const Breadcrumbs: import("svelte").Component<Props, {}, "ref">;
type Breadcrumbs = ReturnType<typeof Breadcrumbs>;
export default Breadcrumbs;
