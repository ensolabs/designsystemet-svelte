import type { ComponentProps } from 'svelte';
import ValidationMessage from '../validation-message/ValidationMessage.svelte';
type Props = Omit<ComponentProps<typeof ValidationMessage>, 'child'> & {
    limit: number;
    under?: string;
    over?: string;
};
declare const FieldCounter: import("svelte").Component<Props, {}, "">;
type FieldCounter = ReturnType<typeof FieldCounter>;
export default FieldCounter;
