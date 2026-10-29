<!-- Svelte twins of packages/react/src/components/Combobox/Combobox.stories.tsx. -->
<script module lang="ts">
  import { Combobox } from '../../../src';
  import Controlled_ from './combobox/Controlled.svelte';
  import InDialog_ from './combobox/InDialog.svelte';
  import InForm_ from './combobox/InForm.svelte';
  import Loading_ from './combobox/Loading.svelte';
  import Multiple_ from './combobox/Multiple.svelte';
  import Places from './combobox/Places.svelte';
  import { items } from './combobox/places';
  import RemoveAllOptions_ from './combobox/RemoveAllOptions.svelte';
  import SelectAll_ from './combobox/SelectAll.svelte';
  import Virtualized_ from './combobox/Virtualized.svelte';
  import WithChipsOutside_ from './combobox/WithChipsOutside.svelte';
  import WithDescription_ from './combobox/WithDescription.svelte';

  export {
    Controlled,
    InDialog,
    InForm,
    Loading,
    Multiple,
    Preview,
    RemoveAllOptions,
    SelectAll,
    ThousandsOfOptions,
    Virtualized,
    WithChipsOutside,
    WithDescription,
    WithNumberValues,
  };
</script>

{#snippet Preview()}
  <Combobox
    multiple={false}
    readonly={false}
    disabled={false}
    hideLabel={false}
    hideChips={false}
    hideClearButton={false}
    virtual={false}
    description="Velg et sted"
    size="md"
    label="Hvor går reisen?"
  >
    <Places />
  </Combobox>
{/snippet}

{#snippet Multiple()}<Multiple_ />{/snippet}

{#snippet WithDescription()}<WithDescription_ />{/snippet}

{#snippet Controlled()}<Controlled_ />{/snippet}

{#snippet InForm()}<InForm_ />{/snippet}

{#snippet InDialog()}<InDialog_ />{/snippet}

{#snippet WithChipsOutside()}<WithChipsOutside_ />{/snippet}

{#snippet SelectAll()}<SelectAll_ />{/snippet}

{#snippet Virtualized()}<Virtualized_ />{/snippet}

{#snippet Loading()}<Loading_ />{/snippet}

{#snippet ThousandsOfOptions()}
  <Combobox label="Hvor går reisen?" virtual>
    <Combobox.Empty>Fant ingen treff</Combobox.Empty>
    {#each items as item, index (index)}
      <Combobox.Option value={item.value}>{item.name}</Combobox.Option>
    {/each}
  </Combobox>
{/snippet}

{#snippet RemoveAllOptions()}<RemoveAllOptions_ />{/snippet}

{#snippet WithNumberValues()}
  <Combobox label="Hvor går reisen?" initialValue={['2000']}>
    <Combobox.Option id="3000" value="3000">some value</Combobox.Option>
    <Combobox.Option id="2000" value="2000">some other value</Combobox.Option>
  </Combobox>
{/snippet}
