<!-- Svelte twins of packages/react/src/components/chip/chip.stories.tsx. -->
<script module lang="ts">
  import { Chip } from '../../../src';

  export { Preview, Checkbox, Removable, Button, Nowrap, Wrap };

  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in lobortis eros. Aenean id tellus molestie, semper massa non, ultricies sapien.';
</script>

{#snippet Preview()}
  <Chip.Radio name="my-radio" value="nynorsk" checked>Nynorsk</Chip.Radio>
  <Chip.Radio name="my-radio" value="bokmål">Bokmål</Chip.Radio>
{/snippet}

{#snippet Checkbox()}<Chip.Checkbox>Nynorsk</Chip.Checkbox>{/snippet}

{#snippet Removable()}<Chip.Removable>Norge</Chip.Removable>{/snippet}

{#snippet Button()}<Chip.Button>Tøm alle filtre</Chip.Button>{/snippet}

{#snippet chips(wrap?: 'wrap')}
  <Chip.Radio data-wrap={wrap} name="my-radio" value="nynorsk" checked>{lorem}</Chip.Radio>
  <Chip.Checkbox data-wrap={wrap} name="my-checkbox" value="nynorsk" checked>{lorem}</Chip.Checkbox>
  <Chip.Removable data-wrap={wrap}>{lorem}</Chip.Removable>
  <Chip.Button data-wrap={wrap}>{lorem}</Chip.Button>
{/snippet}

{#snippet Nowrap()}{@render chips()}{/snippet}

{#snippet Wrap()}{@render chips('wrap')}{/snippet}
