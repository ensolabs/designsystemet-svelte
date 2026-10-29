import TabsRoot from './Tabs.svelte';
import TabsList from './TabsList.svelte';
import TabsPanel from './TabsPanel.svelte';
import TabsTab from './TabsTab.svelte';
const Tabs = Object.assign(TabsRoot, { List: TabsList, Tab: TabsTab, Panel: TabsPanel });
export { Tabs, TabsList, TabsPanel, TabsTab };
