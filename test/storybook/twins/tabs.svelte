<!-- Svelte twins of packages/react/src/components/tabs/tabs.stories.tsx. -->
<script module lang="ts">
  import { Tabs, Tooltip } from '../../../src';
  import BicycleIcon from './icons/BicycleIcon.svelte';
  import CarIcon from './icons/CarIcon.svelte';
  import MotorcycleIcon from './icons/MotorcycleIcon.svelte';
  import ControlledTabs from './tabs/Controlled.svelte';

  export { Preview, IconsOnly, IconsWithText, Controlled, ControlledStop, DefaultValue };

  const vehicles = [
    { value: 'car', tooltip: 'Dine biler', title: 'car', label: 'Biler', Icon: CarIcon },
    { value: 'bicycle', tooltip: 'Dine sykler', title: 'Bicycle', label: 'Sykler', Icon: BicycleIcon },
    { value: 'motorcycle', tooltip: 'Dine motorsykler', title: 'Motorcycle', label: 'Motorsykler', Icon: MotorcycleIcon },
  ];
</script>

{#snippet Preview()}
  <Tabs defaultValue="value1">
    <Tabs.List>
      <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
      <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="value1">content 1</Tabs.Panel>
    <Tabs.Panel value="value2">content 2</Tabs.Panel>
    <Tabs.Panel value="value3">content 3</Tabs.Panel>
  </Tabs>
{/snippet}

{#snippet IconsOnly()}
  <Tabs defaultValue="car">
    <Tabs.List>
      {#each vehicles as { value, tooltip, title, Icon } (value)}
        <Tooltip content={tooltip}>
          {#snippet child({ props })}
            <Tabs.Tab {value} {...props}><Icon {title} /></Tabs.Tab>
          {/snippet}
        </Tooltip>
      {/each}
    </Tabs.List>
    {#each vehicles as { value } (value)}
      <Tabs.Panel {value}>Du har ingen av denne typen registrert hos oss</Tabs.Panel>
    {/each}
  </Tabs>
{/snippet}

{#snippet IconsWithText()}
  <Tabs defaultValue="car">
    <Tabs.List>
      {#each vehicles as { value, label, Icon } (value)}
        <Tabs.Tab {value}><Icon aria-hidden="true" /> {label}</Tabs.Tab>
      {/each}
    </Tabs.List>
    {#each vehicles as { value } (value)}
      <Tabs.Panel {value}>Du har ingen av denne typen registrert hos oss</Tabs.Panel>
    {/each}
  </Tabs>
{/snippet}

{#snippet Controlled()}<ControlledTabs />{/snippet}

{#snippet ControlledStop()}
  <Tabs value="value1">
    <Tabs.List>
      <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="value1">Content of tab 1</Tabs.Panel>
    <Tabs.Panel value="value2">Content of tab 2</Tabs.Panel>
  </Tabs>
{/snippet}

{#snippet DefaultValue()}
  <Tabs defaultValue="value2">
    <Tabs.List>
      <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
      <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="value1">content 1</Tabs.Panel>
    <Tabs.Panel value="value2">content 2</Tabs.Panel>
    <Tabs.Panel value="value3">content 3</Tabs.Panel>
  </Tabs>
{/snippet}
