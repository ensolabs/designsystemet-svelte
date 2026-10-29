<!-- Svelte twins of packages/react/src/components/avatar-stack/avatar-stack.stories.tsx. -->
<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { Avatar, EXPERIMENTAL_AvatarStack as AvatarStack, Tooltip } from '../../../src';
  import Playground from './avatar-stack/Playground.svelte';
  import { cat1Img, cat3Img, cat4Img, cat5Img } from './constants/cats.svelte';
  import BriefcaseIcon from './icons/BriefcaseIcon.svelte';

  const label = 'Test av aria label';
  const styles = `
          section { display: flex; flex-direction: row; gap: var(--ds-size-4); flex-wrap: wrap }
          fieldset { display: flex; gap: var(--ds-size-4); align-items: center }
          input[type="range"] { width: 100% }
          legend { font-size: 11px }
      `;

  export { Preview, Expandable, DataSize, Radius, WithTooltip, WithTooltipAndLink, PlaygroundStory as Playground };
</script>

<!-- The meta's decorator: a style element before the story. -->
{#snippet decorated(story: Snippet)}
  <svelte:element this={'style'}>{styles}</svelte:element>
  {@render story()}
{/snippet}

{#snippet Preview()}
  {#snippet story()}
    <AvatarStack aria-label={label}>
      <li><Avatar aria-label="Navn">{@render cat1Img()}</Avatar></li>
      <li><Avatar aria-label="Navn"><BriefcaseIcon aria-hidden="true" /></Avatar></li>
      <li><Avatar aria-label="Navn">md</Avatar></li>
    </AvatarStack>
  {/snippet}
  {@render decorated(story)}
{/snippet}

{#snippet Expandable()}
  {#snippet story()}
    <section>
      {#each [{ legend: 'expandable', expandable: true }, { legend: 'expandable="fixed"', expandable: 'fixed' as const }] as stack (stack.legend)}
        <fieldset>
          <legend>{stack.legend}</legend>
          <AvatarStack aria-label={label} expandable={stack.expandable}>
            <li><Avatar aria-label="profile picture a">{@render cat1Img()}</Avatar></li>
            <li><Avatar aria-label="profile picture b">{@render cat1Img()}</Avatar></li>
            <li><Avatar aria-label="profile picture c">{@render cat3Img()}</Avatar></li>
            <li><Avatar aria-label="profile picture d">{@render cat4Img()}</Avatar></li>
          </AvatarStack>
        </fieldset>
      {/each}
      <fieldset>
        <legend>default</legend>
        <AvatarStack aria-label={label}>
          <li><Avatar aria-label="Navn">{@render cat1Img()}</Avatar></li>
          <li><Avatar aria-label="Navn">{@render cat1Img()}</Avatar></li>
          <li><Avatar aria-label="Navn">{@render cat3Img()}</Avatar></li>
        </AvatarStack>
      </fieldset>
    </section>
  {/snippet}
  {@render decorated(story)}
{/snippet}

{#snippet DataSize()}
  {#snippet story()}
    {#each [{ legend: 'Avatar size default' }, { legend: 'Avatar size --ds-size-12', style: '--dsc-avatar-stack-size: var(--ds-size-12)' }, { legend: 'Avatar size 3rem', style: '--dsc-avatar-stack-size: 3rem' }] as group (group.legend)}
      <fieldset>
        <legend>{group.legend}</legend>
        {#each ['sm', 'md', 'lg'] as size (size)}
          <AvatarStack data-size={size} aria-label={label} style={group.style}>
            <li><Avatar aria-label="Navn">{@render cat5Img()}</Avatar></li>
            <li><Avatar aria-label="Navn"><BriefcaseIcon aria-hidden="true" /></Avatar></li>
            <li><Avatar aria-label="Navn">{size}</Avatar></li>
          </AvatarStack>
        {/each}
      </fieldset>
    {/each}
  {/snippet}
  {@render decorated(story)}
{/snippet}

{#snippet Radius()}
  {#snippet story()}
    <AvatarStack aria-label={label} expandable="fixed" style="--dsc-avatar-stack-radius: var(--ds-border-radius-sm)">
      <li><Avatar aria-label="variant square" /></li>
      <li><Avatar aria-label="Ola Nordmann">{@render cat5Img()}</Avatar></li>
      <li><Avatar aria-label="Ola Nordmann">{@render cat1Img()}</Avatar></li>
      <li><Avatar aria-label="Ola Nordmann">{@render cat5Img()}</Avatar></li>
      <li><Avatar aria-label="Ola Nordmann">{@render cat5Img()}</Avatar></li>
    </AvatarStack>
  {/snippet}
  {@render decorated(story)}
{/snippet}

{#snippet WithTooltip()}
  {#snippet story()}
    <section>
      <fieldset>
        <legend>expandable</legend>
        <AvatarStack aria-label={label} expandable="fixed">
          <li><Avatar data-tooltip="Ola Nordmann">{@render cat1Img()}</Avatar></li>
          <li><Avatar data-tooltip="Kari Nordmann">{@render cat5Img()}</Avatar></li>
          <li><Avatar data-tooltip="Person 2">Hei</Avatar></li>
          <li><Avatar data-tooltip="Person 3">{@render cat5Img()}</Avatar></li>
        </AvatarStack>
      </fieldset>
      <fieldset>
        <legend>not expandable</legend>
        <AvatarStack aria-label={label}>
          {#each [{ name: 'Ola Nordmann', img: cat1Img }, { name: 'Kari Nordmann', img: cat5Img }, { name: 'Person 2', img: cat5Img }, { name: 'Person 3', img: cat5Img }] as person (person.name)}
            <li>
              <Tooltip content={person.name}>
                {#snippet child({ props })}<Avatar {...props} aria-label="Navn">{@render person.img()}</Avatar>{/snippet}
              </Tooltip>
            </li>
          {/each}
        </AvatarStack>
      </fieldset>
    </section>
  {/snippet}
  {@render decorated(story)}
{/snippet}

{#snippet initialsBR()}BR{/snippet}

{#snippet WithTooltipAndLink()}
  {#snippet story()}
    <section>
      <fieldset>
        <legend>Link expandable</legend>
        <AvatarStack aria-label={label} expandable="fixed">
          {#each [{ name: 'a', img: cat1Img }, { name: 'b', img: cat1Img }, { name: 'c', img: cat3Img }, { name: 'd', img: cat4Img }] as picture (picture.name)}
            <li>
              <Avatar aria-label={`profile picture ${picture.name}`}>
                {#snippet child({ props })}<!-- svelte-ignore a11y_invalid_attribute -->
<a href="#" {...props}>{@render picture.img()}</a>{/snippet}
              </Avatar>
            </li>
          {/each}
        </AvatarStack>
      </fieldset>
      <fieldset>
        <legend>Link + Tooltip</legend>
        <AvatarStack aria-label={label}>
          {#each [{ name: 'Ola Nordmann', picture: 'a', img: cat1Img }, { name: 'Kari Nordmann', picture: 'b', img: cat4Img }, { name: 'Person 2', picture: 'c', img: cat3Img }, { name: 'Person 3', picture: 'd', img: initialsBR }] as person (person.name)}
            <li>
              <Tooltip content={person.name}>
                {#snippet child({ props: tooltip })}
                  <Avatar {...tooltip} aria-label={`profile picture ${person.picture}`}>
                    {#snippet child({ props })}<!-- svelte-ignore a11y_invalid_attribute -->
<a href="#" {...props}>{@render person.img()}</a>{/snippet}
                  </Avatar>
                {/snippet}
              </Tooltip>
            </li>
          {/each}
        </AvatarStack>
      </fieldset>
    </section>
  {/snippet}
  {@render decorated(story)}
{/snippet}

{#snippet PlaygroundStory()}
  {#snippet story()}<Playground />{/snippet}
  {@render decorated(story)}
{/snippet}
