import CardRoot from './Card.svelte';
import CardBlock from './CardBlock.svelte';

const Card = Object.assign(CardRoot, { Block: CardBlock });

export { Card, CardBlock };
