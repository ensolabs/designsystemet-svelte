import type { HTMLAttributes } from 'svelte/elements';
import type { DefaultProps } from '../types';
type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement;
};
declare const FileUpload: import("svelte").Component<Props, {}, "ref">;
type FileUpload = ReturnType<typeof FileUpload>;
export default FileUpload;
