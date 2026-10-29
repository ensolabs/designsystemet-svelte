<!-- Svelte twins of packages/react/src/components/dropdown/dropdown.stories.tsx. -->
<script module lang="ts">
  import { Button, Dialog, Dropdown } from '../../../src';
  import ControlledStory from './dropdown/Controlled.svelte';
  import ControlledExternalTriggerStory from './dropdown/ControlledExternalTrigger.svelte';
  import LinkIcon from './icons/LinkIcon.svelte';

  export {
    Preview,
    Icons,
    Controlled,
    ControlledExternalTrigger,
    WithoutTrigger,
    WithNestedDialog,
    WithAdjacentDialog,
    WithNestedDropdown,
  };

  const links = [
    { href: 'https://github.com/digdir/designsystemet', label: 'Github' },
    { href: 'https://designsystemet.no', label: 'Designsystemet.no' },
  ];
</script>

{#snippet Preview()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
    <Dropdown placement="bottom-end">
      <Dropdown.Heading>First heading</Dropdown.Heading>
      <Dropdown.List>
        <Dropdown.Item><Dropdown.Button>Button 1.1</Dropdown.Button></Dropdown.Item>
        <Dropdown.Item><Dropdown.Button>Button 1.2</Dropdown.Button></Dropdown.Item>
      </Dropdown.List>
      <Dropdown.Heading>Second heading</Dropdown.Heading>
      <Dropdown.List>
        <Dropdown.Item><Dropdown.Button>Button 2.1</Dropdown.Button></Dropdown.Item>
        <Dropdown.Item><Dropdown.Button>Button 2.2</Dropdown.Button></Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
{/snippet}

{#snippet Icons()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
    <Dropdown>
      <Dropdown.List>
        {#each links as { href, label } (href)}
          <Dropdown.Item>
            <Dropdown.Button>
              {#snippet child({ props })}
                <a {href} target="_blank" rel="noreferrer" {...props}><LinkIcon aria-hidden /> {label}</a>
              {/snippet}
            </Dropdown.Button>
          </Dropdown.Item>
        {/each}
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
{/snippet}

{#snippet Controlled()}<ControlledStory />{/snippet}

{#snippet ControlledExternalTrigger()}<ControlledExternalTriggerStory />{/snippet}

{#snippet WithoutTrigger()}
  <Button popovertarget="dropdown">Dropdown</Button>
  <Dropdown id="dropdown">
    <Dropdown.List>
      <Dropdown.Item><Dropdown.Button>Item</Dropdown.Button></Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
{/snippet}

{#snippet WithNestedDialog()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
    <Dropdown>
      <Dropdown.List>
        <Dropdown.Item>
          <Dialog.TriggerContext>
            <Dialog.Trigger>
              {#snippet child({ props })}<Dropdown.Button {...props}>Dialog</Dropdown.Button>{/snippet}
            </Dialog.Trigger>
            <Dialog>Min dialog</Dialog>
          </Dialog.TriggerContext>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
{/snippet}

{#snippet WithAdjacentDialog()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
    <Dropdown>
      <Dropdown.List>
        <Dropdown.Item>
          <Dropdown.Button command="show-modal" commandfor="adjacent-modal">Dialog</Dropdown.Button>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
  <Dialog id="adjacent-modal">Min dialog</Dialog>
{/snippet}

{#snippet WithNestedDropdown()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
    <Dropdown>
      <Dropdown.List>
        <Dropdown.Item>
          <Dropdown.TriggerContext>
            <Dropdown.Trigger variant="tertiary">Dropdown</Dropdown.Trigger>
            <Dropdown>
              <Dropdown.List>
                <Dropdown.Item><Dropdown.Button>Nested</Dropdown.Button></Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          </Dropdown.TriggerContext>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
{/snippet}
