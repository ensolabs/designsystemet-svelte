import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLLegendElement> & {
    ref?: HTMLLegendElement;
};
declare const FieldsetLegend: import("svelte").Component<Props, {}, "ref">;
type FieldsetLegend = ReturnType<typeof FieldsetLegend>;
export default FieldsetLegend;
