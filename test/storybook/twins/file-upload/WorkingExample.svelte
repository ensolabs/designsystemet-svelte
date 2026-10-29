<script lang="ts">
  import { Button, EXPERIMENTAL_FileUpload as FileUpload, Field, Label } from '../../../../src';
  import CircleSlashIcon from '../icons/CircleSlashIcon.svelte';

  let fileInput = $state<HTMLInputElement>();
  let uploadedFiles = $state<File[]>([]);
  let isDragging = $state(false);
  let isReadOnly = $state(false);

  const addFiles = (files: FileList) => {
    uploadedFiles = [...uploadedFiles, ...Array.from(files)];
    isReadOnly = true;
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) addFiles(event.dataTransfer.files);
  };

  const handleChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    const input = event.currentTarget;
    if (input.files && input.files.length > 0) {
      addFiles(input.files);
      input.value = '';
    }
  };

  const handleReset = () => {
    uploadedFiles = [];
    isReadOnly = false;
    isDragging = false;
    if (fileInput) fileInput.value = '';
  };
</script>

<div style="min-width: 300px">
  <Field>
    <Label>Upload profile picture</Label>
    <FileUpload
      ondragover={(event) => {
        event.preventDefault();
        isDragging = true;
      }}
      ondragleave={() => (isDragging = false)}
      ondrop={handleDrop}
    >
      {#if isReadOnly}
        <CircleSlashIcon aria-hidden="true" />
        <Field.Description>You can not upload more files</Field.Description>
      {:else}
        <Field.Description>{isDragging ? 'Drop file to upload' : 'Drop file here'}</Field.Description>
        <Field.Description>File must be in svg format</Field.Description>
        <Button data-variant="secondary">
          {#snippet child({ props })}<span {...props}>Upload file</span>{/snippet}
        </Button>
      {/if}
      <input type="file" bind:this={fileInput} accept=".svg" readonly={isReadOnly} onchange={handleChange} />
    </FileUpload>
  </Field>
  {#if uploadedFiles.length > 0}
    <ul>
      {#each uploadedFiles as file, index (`${file.name}-${file.lastModified}-${index}`)}
        <li>{file.name}</li>
      {/each}
    </ul>
    <Button onclick={handleReset}>Clear file</Button>
  {/if}
</div>
