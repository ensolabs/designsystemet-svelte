import DropdownRoot from './Dropdown.svelte';
import DropdownButton from './DropdownButton.svelte';
// Dropdown.Heading is Heading, as in React.
import DropdownHeading from '../heading/Heading.svelte';
import DropdownItem from './DropdownItem.svelte';
import DropdownList from './DropdownList.svelte';
import DropdownTrigger from './DropdownTrigger.svelte';
import DropdownTriggerContext from './DropdownTriggerContext.svelte';

const Dropdown = Object.assign(DropdownRoot, {
  TriggerContext: DropdownTriggerContext,
  Heading: DropdownHeading,
  List: DropdownList,
  Item: DropdownItem,
  Button: DropdownButton,
  Trigger: DropdownTrigger,
});

export { Dropdown, DropdownButton, DropdownHeading, DropdownItem, DropdownList, DropdownTrigger, DropdownTriggerContext };
