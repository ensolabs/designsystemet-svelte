import type { SVGAttributes } from 'svelte/elements';
type Props = SVGAttributes<SVGSVGElement> & {
    'data-size'?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    ref?: SVGSVGElement;
};
declare const Spinner: import("svelte").Component<Props, {}, "ref">;
type Spinner = ReturnType<typeof Spinner>;
export default Spinner;
