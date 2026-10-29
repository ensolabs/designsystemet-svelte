import type { HTMLOptgroupAttributes } from 'svelte/elements';
import type { ChildSnippet } from '../types';
type Props = HTMLOptgroupAttributes & {
    child?: ChildSnippet;
    ref?: HTMLOptGroupElement;
};
declare const SelectOptgroup: import("svelte").Component<Props, {}, "ref">;
type SelectOptgroup = ReturnType<typeof SelectOptgroup>;
export default SelectOptgroup;
