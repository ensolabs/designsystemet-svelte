<script lang="ts">
  import { Button, EXPERIMENTAL_FileUpload as FileUpload, Field, Label } from '../../../../src';
  import CircleSlashIcon from '../icons/CircleSlashIcon.svelte';
  import { Dropzone, type FileRejection } from './dropzone.svelte';

  const MAX_FILES = 3;
  let files = $state<File[]>([]);
  let rejected = $state<FileRejection[]>([]);
  const isReadOnly = $derived(files.length >= MAX_FILES);
  const dropzone = new Dropzone({
    onDropAccepted: (newFiles) => {
      const remaining = MAX_FILES - files.length;
      files = [...files, ...newFiles.slice(0, remaining)];
    },
    onDropRejected: (rej) => {
      rejected = [...rejected, ...rej];
    },
    accept: { 'image/svg+xml': ['.svg'] },
    maxFiles: MAX_FILES,
    disabled: () => isReadOnly,
  });
  const { attach, ...inputProps } = $derived(dropzone.getInputProps({ readonly: isReadOnly, 'aria-invalid': dropzone.isDragReject }));
</script>

<div style="min-width: 300px">
  <!-- When using a dropzone, put its root props on the Field, not the FileUpload, so screen readers see the Label. -->
  <Field {...dropzone.getRootProps()}>
    <Label>Upload profile picture</Label>
    <FileUpload>
      {#if isReadOnly}
        <CircleSlashIcon aria-hidden="true" />
        <Field.Description>You can not upload more files</Field.Description>
      {:else}
        {#if dropzone.isDragReject}<CircleSlashIcon aria-hidden="true" />{/if}
        <Field.Description>
          {dropzone.isDragReject ? 'File type not accepted' : dropzone.isDragActive ? 'Drop file(s) here' : 'Drop file(s) or click to upload'}
        </Field.Description>
        <Field.Description>
          File must be <code>.svg</code>, {MAX_FILES - files.length} of {MAX_FILES} files remaining
        </Field.Description>
        <Button data-variant="secondary">
          {#snippet child({ props })}<span {...props}>Upload file</span>{/snippet}
        </Button>
      {/if}

      <input {...inputProps} {@attach attach} />
    </FileUpload>
  </Field>
  {#if files.length > 0}
    <p>Accepted files</p>
    <ul>
      {#each files as file (`${file.name}-${file.lastModified}`)}
        <li>{file.name}</li>
      {/each}
    </ul>
  {/if}
  {#if rejected.length > 0}
    <p>Rejected files</p>
    <ul>
      {#each rejected as { file, errors } (`${file.name}-${file.lastModified}`)}
        <li>{file.name} — {errors.map((e) => e.message).join(', ')}</li>
      {/each}
    </ul>
  {/if}
</div>
