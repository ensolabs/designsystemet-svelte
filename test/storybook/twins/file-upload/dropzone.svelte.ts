// A Svelte stand-in for react-dropzone's useDropzone, as far as the ReactDropZoneExample story uses it: the same
// attributes from getRootProps and getInputProps, drag state, and accept/maxFiles checks on drop and on change.
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

export type FileRejection = { file: File; errors: { code: string; message: string }[] };

type Options = {
  accept: Record<string, string[]>;
  maxFiles: number;
  disabled: () => boolean;
  onDropAccepted: (files: File[]) => void;
  onDropRejected: (rejections: FileRejection[]) => void;
};

export class Dropzone {
  isDragActive = $state(false);
  isDragReject = $state(false);
  #input: HTMLInputElement | undefined;
  #options: Options;

  constructor(options: Options) {
    this.#options = options;
  }

  get #acceptAttr() {
    return Object.entries(this.#options.accept)
      .flatMap(([mime, extensions]) => [mime, ...extensions])
      .join(',');
  }

  #accepts(type: string, name = '') {
    return Object.entries(this.#options.accept).some(
      ([mime, extensions]) => type === mime || extensions.some((ext) => name.toLowerCase().endsWith(ext)),
    );
  }

  #take(files: File[]) {
    const accepted: File[] = [];
    const rejected: FileRejection[] = [];
    for (const file of files) {
      if (this.#accepts(file.type, file.name)) accepted.push(file);
      else rejected.push({ file, errors: [{ code: 'file-invalid-type', message: `File type must be ${this.#acceptAttr}` }] });
    }
    if (accepted.length > this.#options.maxFiles) {
      rejected.push(...accepted.map((file) => ({ file, errors: [{ code: 'too-many-files', message: 'Too many files' }] })));
      accepted.length = 0;
    }
    if (accepted.length) this.#options.onDropAccepted(accepted);
    if (rejected.length) this.#options.onDropRejected(rejected);
  }

  #reset() {
    this.isDragActive = false;
    this.isDragReject = false;
  }

  getRootProps(): HTMLAttributes<HTMLElement> {
    const disabled = this.#options.disabled();
    const drag = (handler: (event: DragEvent) => void) => (event: DragEvent) => {
      event.preventDefault();
      if (!disabled) handler(event);
    };
    return {
      role: 'presentation',
      ...(disabled ? { 'aria-disabled': true } : { tabindex: 0 }),
      onclick: () => !disabled && this.#input?.click(),
      onkeydown: (event: KeyboardEvent) => {
        if (!disabled && (event.key === ' ' || event.key === 'Enter')) {
          event.preventDefault();
          this.#input?.click();
        }
      },
      ondragenter: drag((event) => {
        const items = Array.from(event.dataTransfer?.items ?? []);
        this.isDragActive = true;
        this.isDragReject = items.length > this.#options.maxFiles || items.some((item) => !this.#accepts(item.type));
      }),
      ondragover: drag(() => {}),
      ondragleave: drag((event) => {
        if (!(event.currentTarget as Node).contains(event.relatedTarget as Node | null)) this.#reset();
      }),
      ondrop: drag((event) => {
        this.#reset();
        this.#take(Array.from(event.dataTransfer?.files ?? []));
      }),
    };
  }

  getInputProps(rest: HTMLInputAttributes = {}): HTMLInputAttributes & { attach: (input: HTMLInputElement) => void } {
    return {
      accept: this.#acceptAttr,
      multiple: this.#options.maxFiles !== 1,
      type: 'file',
      'aria-label': 'file upload',
      style: 'border: 0; display: block; height: 0; margin: 0; opacity: 0; overflow: hidden; padding: 0; width: 0',
      onchange: (event) => {
        this.#take(Array.from(event.currentTarget.files ?? []));
        event.currentTarget.value = '';
      },
      onclick: (event) => event.stopPropagation(),
      tabindex: -1,
      attach: (input) => {
        this.#input = input;
      },
      ...rest,
    };
  }
}
