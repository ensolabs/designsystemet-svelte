import type { HTMLFieldsetAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLFieldsetAttributes & {
    ref?: HTMLFieldSetElement;
};
declare const Fieldset: import("svelte").Component<Props, {}, "ref">;
type Fieldset = ReturnType<typeof Fieldset>;
export default Fieldset;
