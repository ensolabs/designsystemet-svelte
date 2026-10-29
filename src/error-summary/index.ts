import ErrorSummaryRoot from './ErrorSummary.svelte';
import ErrorSummaryHeading from './ErrorSummaryHeading.svelte';
import ErrorSummaryItem from './ErrorSummaryItem.svelte';
import ErrorSummaryLink from './ErrorSummaryLink.svelte';
import ErrorSummaryList from './ErrorSummaryList.svelte';

const ErrorSummary = Object.assign(ErrorSummaryRoot, {
  Heading: ErrorSummaryHeading,
  Item: ErrorSummaryItem,
  List: ErrorSummaryList,
  Link: ErrorSummaryLink,
});

export { ErrorSummary, ErrorSummaryHeading, ErrorSummaryItem, ErrorSummaryLink, ErrorSummaryList };
