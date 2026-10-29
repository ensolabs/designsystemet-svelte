<!-- Svelte twins of packages/react/src/components/avatar/avatar.stories.tsx. -->
<script module lang="ts">
  import { Avatar, Badge, Dropdown } from '../../../src';
  import { cat3Img } from './constants/cats.svelte';
  import { themeColors } from './constants/colors';
  import BriefcaseIcon from './icons/BriefcaseIcon.svelte';
  import HeartIcon from './icons/HeartIcon.svelte';

  const sizes = [
    { size: 'xs', label: 'extra small' },
    { size: 'sm', label: 'small' },
    { size: 'md', label: 'medium' },
    { size: 'lg', label: 'large' },
  ];

  export { Preview, NoName, Sizes, ColorVariants, Radius, WithImage, InDropdown, AsLink, AsButton, SlotAndInitials };
</script>

{#snippet Preview()}<Avatar aria-label="Ola Nordmann" />{/snippet}

{#snippet NoName()}<Avatar aria-label="Ola" />{/snippet}

{#snippet Sizes()}
  {#each sizes as { size, label } (size)}
    <Avatar data-size={size} aria-label={label}>{size}</Avatar>
    <Avatar data-size={size} aria-label={label} />
    <Avatar data-size={size} aria-label={label}><HeartIcon aria-hidden /></Avatar>
  {/each}
{/snippet}

{#snippet ColorVariants()}
  {#each themeColors as color (color)}
    <Avatar data-color={color} aria-label={`color ${color}`} />
  {/each}
{/snippet}

{#snippet Radius()}
  <Avatar aria-label="radius default" />
  <Avatar aria-label="radius md 1" style="--dsc-avatar-radius: var(--ds-border-radius-md)" />
  <Avatar aria-label="Ola Nordmann">ON</Avatar>
  <Avatar aria-label="radius md 2" style="--dsc-avatar-radius: var(--ds-border-radius-md)">ON</Avatar>
{/snippet}

{#snippet WithImage()}<Avatar aria-label="Ola Nordmann">{@render cat3Img()}</Avatar>{/snippet}

{#snippet InDropdown()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger variant="tertiary">
      <Avatar aria-label="Ola Nordmann" data-size="sm">ON</Avatar>
      Velg Profil
    </Dropdown.Trigger>
    <Dropdown placement="bottom-end" autoPlacement={false} data-size="md" open>
      <Dropdown.List>
        <Dropdown.Item>
          <Dropdown.Button>
            <Badge.Position overlap="circle">
              <Badge data-color="danger" data-size="sm"></Badge>
              <Avatar aria-hidden={true} data-size="xs">ON</Avatar>
            </Badge.Position>
            Ola Nordmann
          </Dropdown.Button>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Button>
            <Avatar aria-hidden data-size="xs"><BriefcaseIcon /></Avatar>
            Sogndal kommune
          </Dropdown.Button>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
{/snippet}

{#snippet AsLink()}
  {#each sizes as { size } (size)}
    <Avatar aria-label={size} data-size={size}>
      {#snippet child({ props })}<a href="#none" {...props}><HeartIcon aria-hidden /></a>{/snippet}
    </Avatar>
  {/each}
{/snippet}

{#snippet AsButton()}
  {#each sizes as { size } (size)}
    <Avatar aria-label={size} data-size={size}>
      {#snippet child({ props })}<button type="button" {...props}><HeartIcon aria-hidden /></button>{/snippet}
    </Avatar>
  {/each}
{/snippet}

{#snippet SlotAndInitials()}
  <Avatar aria-label="xs">
    {#snippet child({ props })}<button type="button" {...props}>DS</button>{/snippet}
  </Avatar>
  <Avatar aria-label="xs">
    {#snippet child({ props })}<button type="button" {...props}>0</button>{/snippet}
  </Avatar>
  <Avatar aria-label="xs">
    {#snippet child({ props })}<button type="button" {...props}>{@render cat3Img()}</button>{/snippet}
  </Avatar>
{/snippet}
