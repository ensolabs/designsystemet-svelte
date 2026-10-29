import ToggleGroupRoot from './ToggleGroup.svelte';
import ToggleGroupItem from './ToggleGroupItem.svelte';

const ToggleGroup = Object.assign(ToggleGroupRoot, { Item: ToggleGroupItem });

export { ToggleGroup, ToggleGroupItem };
