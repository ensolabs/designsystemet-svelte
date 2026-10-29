import BadgeRoot from './Badge.svelte';
import BadgePosition from './BadgePosition.svelte';
const Badge = Object.assign(BadgeRoot, { Position: BadgePosition });
export { Badge, BadgePosition };
