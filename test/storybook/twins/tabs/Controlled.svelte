<!-- The Controlled story: a button outside Tabs selects the third tab. -->
<script lang="ts">
  import { Button, Tabs } from '../../../../src';
  import BackpackIcon from '../icons/BackpackIcon.svelte';
  import BellIcon from '../icons/BellIcon.svelte';
  import NewspaperIcon from '../icons/NewspaperIcon.svelte';

  let value = $state('value1');
</script>

<Button data-size="sm" onclick={() => (value = 'value3')}>Choose Tab 3</Button>
<br />
<Tabs bind:value>
  <Tabs.List>
    <Tabs.Tab value="value1"><BellIcon aria-hidden /> Tab 1</Tabs.Tab>
    <Tabs.Tab value="value2"><NewspaperIcon aria-hidden /> Tab 2</Tabs.Tab>
    <Tabs.Tab value="value3"><BackpackIcon aria-hidden /> Tab 3</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="value1">content 1</Tabs.Panel>
  <Tabs.Panel value="value2">content 2</Tabs.Panel>
  <Tabs.Panel value="value3">content 3</Tabs.Panel>
</Tabs>
