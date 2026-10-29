<!-- Svelte twins of packages/react/src/components/file-upload/file-upload.stories.tsx. -->
<script module lang="ts">
  import { Button, EXPERIMENTAL_FileUpload as FileUpload, Field, Label } from '../../../src';
  import ReactDropZoneExample_ from './file-upload/ReactDropZoneExample.svelte';
  import WorkingExample_ from './file-upload/WorkingExample.svelte';

  export { HiddenLabel, LinkAlt, Preview, ReactDropZoneExample, ReadOnly, Variants, WorkingExample };
</script>

{#snippet uploadButton()}
  <Button data-variant="secondary">
    {#snippet child({ props })}<span {...props}>Upload file</span>{/snippet}
  </Button>
{/snippet}

{#snippet Preview()}
  <Field>
    <Label>Upload file</Label>
    <FileUpload>
      <Field.Description>Drop file here</Field.Description>
      <Field.Description>File must be in csv format and less than 2MB</Field.Description>
      {@render uploadButton()}
      <input type="file" />
    </FileUpload>
  </Field>
{/snippet}

{#snippet Variants()}
  <Field>
    <Label>color variant default</Label>
    <FileUpload>
      <Field.Description>Drop file here</Field.Description>
      <Field.Description>File must be in csv format and less than 2MB</Field.Description>
      {@render uploadButton()}
      <input type="file" />
    </FileUpload>
  </Field>
  <Field>
    <Label>color variant neutral</Label>
    <FileUpload data-color="neutral">
      <Field.Description>Drop file here</Field.Description>
      <Field.Description>File must be in csv format and less than 2MB</Field.Description>
      {@render uploadButton()}
      <input type="file" />
    </FileUpload>
  </Field>
{/snippet}

{#snippet LinkAlt()}
  <Field>
    <Label>Upload file</Label>
    <FileUpload>
      <Field.Description>Drop files or <span class="ds-link">click to browse</span></Field.Description>
      <Field.Description>File must be in csv format and less than 2MB</Field.Description>
      <input type="file" />
    </FileUpload>
  </Field>
{/snippet}

{#snippet ReadOnly()}
  <Field>
    <Label>Upload file</Label>
    <Field.Description>description text</Field.Description>
    <FileUpload>
      <Field.Description>Upload limit reached</Field.Description>
      {@render uploadButton()}
      <input type="file" readonly={true} />
    </FileUpload>
  </Field>
{/snippet}

{#snippet HiddenLabel()}
  <Field>
    <Label class="ds-sr-only">Upload file</Label>
    <Field.Description>description text</Field.Description>
    <FileUpload>
      <Field.Description>Drop file here</Field.Description>
      <Field.Description>File must be in csv format and less than 2MB</Field.Description>
      {@render uploadButton()}
      <input type="file" />
    </FileUpload>
  </Field>
{/snippet}

{#snippet WorkingExample()}<WorkingExample_ />{/snippet}

{#snippet ReactDropZoneExample()}<ReactDropZoneExample_ />{/snippet}
