<!-- Svelte twins of the stories in overlays.test.tsx: the same name, the same markup. -->
<script module lang="ts">
  import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList } from '../../src/breadcrumbs';
  import { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext } from '../../src/dialog';
  import { Dropdown, DropdownButton, DropdownHeading, DropdownItem, DropdownList, DropdownTrigger, DropdownTriggerContext } from '../../src/dropdown';
  import { Pagination, PaginationButton, PaginationItem, PaginationList } from '../../src/pagination';
  import { Popover, PopoverTrigger, PopoverTriggerContext } from '../../src/popover';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '../../src/tabs';
  import Tooltip from '../../src/tooltip/Tooltip.svelte';
  import { pagination } from '../../src/utilities/pagination';

  export {
    tabs,
    tabsControlled,
    tabsFlat,
    breadcrumbs,
    breadcrumbsFlat,
    breadcrumbsLinkAsChild,
    paginationBasic,
    paginationFlat,
    paginationAsChild,
    paginationHook,
    dialog,
    dialogOptions,
    dialogOpen,
    dialogNonModalOpen,
    dialogTrigger,
    dialogTriggerAsChild,
    dialogFlat,
    dialogBlockAsChild,
    popover,
    popoverOptions,
    popoverInline,
    popoverTriggerProps,
    popoverTriggerAsChild,
    popoverOpen,
    popoverAsChild,
    popoverFlat,
    dropdown,
    dropdownFlat,
    dropdownOpen,
    dropdownHeading,
    tooltip,
    tooltipText,
    tooltipOptions,
  };

  const hook = pagination({ currentPage: 4, totalPages: 10 });
</script>

{#snippet tabs()}
  <Tabs defaultValue="b" data-size="sm" data-color="accent" class="extra">
    <Tabs.List class="list">
      <Tabs.Tab value="a">A</Tabs.Tab>
      <Tabs.Tab value="b" class="tab">B</Tabs.Tab>
      <Tabs.Tab value="c" aria-controls="own-panel">C</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="a">Innhold A</Tabs.Panel>
    <Tabs.Panel value="b" class="panel">Innhold B</Tabs.Panel>
    <Tabs.Panel value="c" id="own-panel">Innhold C</Tabs.Panel>
  </Tabs>
{/snippet}

{#snippet tabsControlled()}
  <Tabs value="2">
    <Tabs.List>
      <Tabs.Tab value="1">En</Tabs.Tab>
      <Tabs.Tab value="2">To</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="1">1</Tabs.Panel>
    <Tabs.Panel value="2">2</Tabs.Panel>
  </Tabs>
{/snippet}

{#snippet tabsFlat()}
  <Tabs>
    <TabsList>
      <TabsTab value="x">X</TabsTab>
    </TabsList>
    <TabsPanel value="x">Innhold X</TabsPanel>
  </Tabs>
  <TabsTab value="y">Utenfor</TabsTab>
{/snippet}

{#snippet breadcrumbs()}
  <Breadcrumbs aria-label="Du er her:" class="extra" data-size="sm">
    <Breadcrumbs.Link href="/niva-1" aria-label="Tilbake til Nivå 1">Nivå 1</Breadcrumbs.Link>
    <Breadcrumbs.List class="list">
      <Breadcrumbs.Item class="dropped">
        <Breadcrumbs.Link href="/niva-1">Nivå 1</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/niva-2" aria-current="page" class="current" data-color="neutral">Nivå 2</Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs.List>
  </Breadcrumbs>
{/snippet}

{#snippet breadcrumbsFlat()}
  <Breadcrumbs aria-label="Du er her:">
    <BreadcrumbsList>
      <BreadcrumbsItem><BreadcrumbsLink href="/">Hjem</BreadcrumbsLink></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
{/snippet}

{#snippet breadcrumbsLinkAsChild()}
  <Breadcrumbs.Link class="extra">
    {#snippet child({ props })}<a href="/ruter" data-router {...props}>Ruter</a>{/snippet}
  </Breadcrumbs.Link>
{/snippet}

{#snippet paginationBasic()}
  <Pagination aria-label="Sidenavigering" data-current="2" data-total="5" class="extra" data-size="sm">
    <Pagination.List class="list">
      <Pagination.Item class="dropped"><Pagination.Button aria-label="Forrige side">Forrige</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button>1</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-current="true" variant="primary">2</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button>3</Pagination.Button></Pagination.Item>
      <Pagination.Item><Pagination.Button aria-label="Neste side">Neste</Pagination.Button></Pagination.Item>
    </Pagination.List>
  </Pagination>
{/snippet}

{#snippet paginationFlat()}
  <Pagination aria-label="Sider">
    <PaginationList>
      <PaginationItem><PaginationButton data-color="neutral">1</PaginationButton></PaginationItem>
    </PaginationList>
  </Pagination>
{/snippet}

{#snippet paginationAsChild()}
  <Pagination aria-label="Sider" class="extra">
    {#snippet child({ props })}
      <nav {...props}>
        <Pagination.List>
          {#snippet child({ props })}
            <ol {...props}>
              <Pagination.Item class="dropped">
                {#snippet child({ props })}<li data-own {...props}><a href="/side/1">1</a></li>{/snippet}
              </Pagination.Item>
            </ol>
          {/snippet}
        </Pagination.List>
      </nav>
    {/snippet}
  </Pagination>
{/snippet}

{#snippet paginationHook()}
  <Pagination aria-label="Sidenavigering">
    <Pagination.List>
      <Pagination.Item>
        <Pagination.Button aria-label="Forrige side" {...hook.prevButtonProps}>Forrige</Pagination.Button>
      </Pagination.Item>
      {#each hook.pages as { page, itemKey, buttonProps } (itemKey)}
        <Pagination.Item>
          {#if buttonProps}<Pagination.Button {...buttonProps}>{page}</Pagination.Button>{/if}
        </Pagination.Item>
      {/each}
      <Pagination.Item>
        <Pagination.Button aria-label="Neste side" {...hook.nextButtonProps}>Neste</Pagination.Button>
      </Pagination.Item>
    </Pagination.List>
  </Pagination>
{/snippet}

{#snippet dialog()}
  <Dialog>Innhold</Dialog>
{/snippet}

{#snippet dialogOptions()}
  <Dialog closeButton={false} modal={false} placement="right" id="d1" class="extra" closedby="any" data-color="danger" data-size="lg">
    <Dialog.Block class="block">Topp</Dialog.Block>
    <Dialog.Block>Bunn</Dialog.Block>
  </Dialog>
  <Dialog closeButton="Lukk" placement="bottom">Egen etikett</Dialog>
{/snippet}

{#snippet dialogOpen()}
  <Dialog open>Åpen</Dialog>
{/snippet}

{#snippet dialogNonModalOpen()}
  <Dialog open modal={false}>Åpen</Dialog>
{/snippet}

{#snippet dialogTrigger()}
  <Dialog.TriggerContext>
    <Dialog.Trigger variant="secondary" class="extra">Åpne</Dialog.Trigger>
    <Dialog>Innhold</Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet dialogTriggerAsChild()}
  <Dialog.TriggerContext>
    <Dialog.Trigger class="extra">
      {#snippet child({ props })}<a href="#d" {...props}>Åpne</a>{/snippet}
    </Dialog.Trigger>
    <Dialog>Innhold</Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet dialogFlat()}
  <DialogTriggerContext>
    <DialogTrigger>Åpne</DialogTrigger>
    <Dialog><DialogBlock>Innhold</DialogBlock></Dialog>
  </DialogTriggerContext>
{/snippet}

{#snippet dialogBlockAsChild()}
  <Dialog.Block class="extra">
    {#snippet child({ props })}<section {...props}>Seksjon</section>{/snippet}
  </Dialog.Block>
{/snippet}

{#snippet popover()}
  <Popover.TriggerContext>
    <Popover.Trigger>Åpne</Popover.Trigger>
    <Popover>Innhold</Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet popoverOptions()}
  <Popover.TriggerContext>
    <Popover.Trigger variant="secondary" data-size="sm">Åpne</Popover.Trigger>
    <Popover id="p1" variant="tinted" placement="bottom-start" autoPlacement={false} class="extra" data-color="danger">Innhold</Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet popoverInline()}
  <Popover.TriggerContext>
    <p>Les om <Popover.Trigger inline class="extra">dette</Popover.Trigger>.</p>
    <Popover>Forklaring</Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet popoverTriggerProps()}
  <Popover.Trigger popovertarget="p2" id="dropped">Åpne</Popover.Trigger>
  <Popover.Trigger>Uten kontekst</Popover.Trigger>
  <Popover id="p2">Innhold</Popover>
  <Popover>Uten id</Popover>
{/snippet}

{#snippet popoverTriggerAsChild()}
  <Popover.TriggerContext>
    <Popover.Trigger class="extra">
      {#snippet child({ props })}<span role="button" tabindex="0" {...props}>Åpne</span>{/snippet}
    </Popover.Trigger>
    <Popover>Innhold</Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet popoverOpen()}
  <Popover.TriggerContext>
    <Popover.Trigger>Åpne</Popover.Trigger>
    <Popover open>Innhold</Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet popoverAsChild()}
  <Popover.TriggerContext>
    <Popover.Trigger>Åpne</Popover.Trigger>
    <Popover class="extra">
      {#snippet child({ props })}<section {...props}>Innhold</section>{/snippet}
    </Popover>
  </Popover.TriggerContext>
{/snippet}

{#snippet popoverFlat()}
  <PopoverTriggerContext>
    <PopoverTrigger>Åpne</PopoverTrigger>
    <Popover>Innhold</Popover>
  </PopoverTriggerContext>
{/snippet}

{#snippet dropdown()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger variant="secondary">Meny</Dropdown.Trigger>
    <Dropdown class="extra" data-size="sm">
      <Dropdown.Heading>Overskrift</Dropdown.Heading>
      <Dropdown.List class="list">
        <Dropdown.Item class="item"><Dropdown.Button>Valg 1</Dropdown.Button></Dropdown.Item>
        <Dropdown.Item><Dropdown.Button data-color="danger" disabled>Valg 2</Dropdown.Button></Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
{/snippet}

{#snippet dropdownFlat()}
  <DropdownTriggerContext>
    <DropdownTrigger inline>Meny</DropdownTrigger>
    <Dropdown id="dd" placement="top">
      <DropdownHeading level={3}>Overskrift</DropdownHeading>
      <DropdownList>
        <DropdownItem><DropdownButton>Valg</DropdownButton></DropdownItem>
      </DropdownList>
    </Dropdown>
  </DropdownTriggerContext>
{/snippet}

{#snippet dropdownOpen()}
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Meny</Dropdown.Trigger>
    <Dropdown open><Dropdown.List><Dropdown.Item>Valg</Dropdown.Item></Dropdown.List></Dropdown>
  </Dropdown.TriggerContext>
{/snippet}

{#snippet dropdownHeading()}
  <Dropdown.Heading level={4} data-size="xs" class="extra">Liten</Dropdown.Heading>
  <Dropdown.Heading class="extra">
    {#snippet child({ props })}<p {...props}>Som avsnitt</p>{/snippet}
  </Dropdown.Heading>
{/snippet}

{#snippet tooltip()}
  <Tooltip content="Slett">
    {#snippet child({ props })}<button class="own" {...props}>X</button>{/snippet}
  </Tooltip>
{/snippet}

{#snippet tooltipText()}
  <Tooltip content="Sist endret 3. mars">i går</Tooltip>
{/snippet}

{#snippet tooltipOptions()}
  <Tooltip content="Lagre" placement="bottom" autoPlacement={false} open type="labelledby" class="extra" data-color="neutral" data-size="sm">
    Tekst
  </Tooltip>
  <Tooltip content="Av" open={false} type="describedby">Lukket</Tooltip>
{/snippet}
