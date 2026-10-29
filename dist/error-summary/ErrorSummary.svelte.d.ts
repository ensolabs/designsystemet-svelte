import type { DSErrorSummaryElement } from '@digdir/designsystemet-web';
import type { HTMLAttributes } from 'svelte/elements';
import type { ChildSnippet, DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<DSErrorSummaryElement> & {
    child?: ChildSnippet;
    ref?: DSErrorSummaryElement;
};
declare const ErrorSummary: import("svelte").Component<Props, {}, "ref">;
type ErrorSummary = ReturnType<typeof ErrorSummary>;
export default ErrorSummary;
