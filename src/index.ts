// Designsystemet for Svelte 5: the components of @digdir/designsystemet-react@1.23.0, with the same names and markup.

// The behaviour layer, as @digdir/designsystemet-react loads it. It checks for a browser, so it is safe on a server.
import '@digdir/designsystemet-web';

export type { ChildSnippet, Content, DefaultProps, Size } from './types';

export { default as Alert } from './alert/Alert.svelte';
export { default as Avatar } from './avatar/Avatar.svelte';
export { default as EXPERIMENTAL_AvatarStack } from './avatar-stack/AvatarStack.svelte';
export { Badge, BadgePosition } from './badge';
export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList } from './breadcrumbs';
export { default as Button } from './button/Button.svelte';
export { Card, CardBlock } from './card';
export { default as Checkbox } from './checkbox/Checkbox.svelte';
export { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable } from './chip';
export { Details, DetailsContent, DetailsSummary } from './details';
export { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext } from './dialog';
export { default as Divider } from './divider/Divider.svelte';
export { Dropdown, DropdownButton, DropdownHeading, DropdownItem, DropdownList, DropdownTrigger, DropdownTriggerContext } from './dropdown';
export { ErrorSummary, ErrorSummaryHeading, ErrorSummaryItem, ErrorSummaryLink, ErrorSummaryList } from './error-summary';
export { Field, FieldAffix, FieldAffixes, FieldCounter, FieldDescription } from './field';
export { Fieldset, FieldsetDescription, FieldsetLegend } from './fieldset';
export { EXPERIMENTAL_FileUpload } from './file-upload';
export { default as Heading } from './heading/Heading.svelte';
export { default as Input } from './input/Input.svelte';
export { default as Label } from './label/Label.svelte';
export { default as Link } from './link/Link.svelte';
export { List, ListItem, ListOrdered, ListUnordered } from './list';
export { Pagination, PaginationButton, PaginationItem, PaginationList } from './pagination';
export { default as Paragraph } from './paragraph/Paragraph.svelte';
export { Popover, PopoverTrigger, PopoverTriggerContext, type Placement } from './popover';
export { default as Radio } from './radio/Radio.svelte';
export { Search, SearchButton, SearchClear, SearchInput } from './search';
export { Select, SelectOptgroup, SelectOption } from './select';
export { default as Skeleton } from './skeleton/Skeleton.svelte';
export { default as SkipLink } from './skip-link/SkipLink.svelte';
export { default as Spinner } from './spinner/Spinner.svelte';
export {
  EXPERIMENTAL_Suggestion,
  EXPERIMENTAL_SuggestionClear,
  EXPERIMENTAL_SuggestionEmpty,
  EXPERIMENTAL_SuggestionInput,
  EXPERIMENTAL_SuggestionList,
  EXPERIMENTAL_SuggestionOption,
  EXPERIMENTAL_SuggestionToggle,
  type EventBeforeMatch,
  type Filter,
  type SuggestionItem,
} from './suggestion';
export { default as Switch } from './switch/Switch.svelte';
export { Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow } from './table';
export { Tabs, TabsList, TabsPanel, TabsTab } from './tabs';
export { default as Tag } from './tag/Tag.svelte';
export { default as Textarea } from './textarea/Textarea.svelte';
export { default as Textfield } from './textfield/Textfield.svelte';
export { ToggleGroup, ToggleGroupItem } from './toggle-group';
export { default as Tooltip } from './tooltip/Tooltip.svelte';
export { pagination, type PaginationButtonProps, type PaginationOptions } from './utilities/pagination';
export { synchronizedAnimation } from './utilities/synchronized-animation';
export { default as ValidationMessage } from './validation-message/ValidationMessage.svelte';
