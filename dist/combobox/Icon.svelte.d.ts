import type { SVGAttributes } from 'svelte/elements';
type Props = SVGAttributes<SVGSVGElement> & {
    d: string;
    evenodd?: boolean;
    title?: string;
};
declare const Icon: import("svelte").Component<Props, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
