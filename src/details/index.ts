import DetailsRoot from './Details.svelte';
import DetailsContent from './DetailsContent.svelte';
import DetailsSummary from './DetailsSummary.svelte';

const Details = Object.assign(DetailsRoot, { Summary: DetailsSummary, Content: DetailsContent });

export { Details, DetailsContent, DetailsSummary };
