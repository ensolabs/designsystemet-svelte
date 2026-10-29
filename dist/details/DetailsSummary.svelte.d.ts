import type { HTMLAttributes } from 'svelte/elements';
type Props = HTMLAttributes<HTMLElement> & {
    ref?: HTMLElement;
};
declare const DetailsSummary: import("svelte").Component<Props, {}, "ref">;
type DetailsSummary = ReturnType<typeof DetailsSummary>;
export default DetailsSummary;
