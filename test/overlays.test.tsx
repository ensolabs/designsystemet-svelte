import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  Dialog,
  DialogBlock,
  DialogTrigger,
  DialogTriggerContext,
  Dropdown,
  DropdownButton,
  DropdownHeading,
  DropdownItem,
  DropdownList,
  DropdownTrigger,
  DropdownTriggerContext,
  Pagination,
  PaginationButton,
  PaginationItem,
  PaginationList,
  Popover,
  PopoverTrigger,
  PopoverTriggerContext,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Tooltip,
  usePagination,
} from '@digdir/designsystemet-react';
import { act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, unmount, type Snippet } from 'svelte';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { pagination } from '../src/utilities/pagination';
import { both } from './parity';
import * as S from './stories/overlays.svelte';
import DialogBound from './stories/overlays/DialogBound.svelte';
import DropdownContext from './stories/overlays/DropdownContext.svelte';
import PopoverBound from './stories/overlays/PopoverBound.svelte';
import TabsBound from './stories/overlays/TabsBound.svelte';

const macrotask = () => new Promise((resolve) => setTimeout(resolve));


function PaginationHook() {
  const { pages, prevButtonProps, nextButtonProps } = usePagination({ currentPage: 4, totalPages: 10 });
  return (
    <Pagination aria-label="Sidenavigering">
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button aria-label="Forrige side" {...prevButtonProps}>Forrige</Pagination.Button>
        </Pagination.Item>
        {pages.map(({ page, itemKey, buttonProps }) => (
          <Pagination.Item key={itemKey}>{buttonProps && <Pagination.Button {...buttonProps}>{page}</Pagination.Button>}</Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Button aria-label="Neste side" {...nextButtonProps}>Neste</Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  );
}

const stories: Record<Exclude<keyof typeof S, 'default'>, ReactElement> = {
  tabs: (
    <Tabs defaultValue="b" data-size="sm" data-color="accent" className="extra">
      <Tabs.List className="list">
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b" className="tab">B</Tabs.Tab>
        <Tabs.Tab value="c" aria-controls="own-panel">C</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">Innhold A</Tabs.Panel>
      <Tabs.Panel value="b" className="panel">Innhold B</Tabs.Panel>
      <Tabs.Panel value="c" id="own-panel">Innhold C</Tabs.Panel>
    </Tabs>
  ),
  tabsControlled: (
    <Tabs value="2">
      <Tabs.List>
        <Tabs.Tab value="1">En</Tabs.Tab>
        <Tabs.Tab value="2">To</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="1">1</Tabs.Panel>
      <Tabs.Panel value="2">2</Tabs.Panel>
    </Tabs>
  ),
  tabsFlat: (
    <>
      <Tabs>
        <TabsList>
          <TabsTab value="x">X</TabsTab>
        </TabsList>
        <TabsPanel value="x">Innhold X</TabsPanel>
      </Tabs>
      <TabsTab value="y">Utenfor</TabsTab>
    </>
  ),
  breadcrumbs: (
    <Breadcrumbs aria-label="Du er her:" className="extra" data-size="sm">
      <Breadcrumbs.Link href="/niva-1" aria-label="Tilbake til Nivå 1">Nivå 1</Breadcrumbs.Link>
      <Breadcrumbs.List className="list">
        <Breadcrumbs.Item className="dropped">
          <Breadcrumbs.Link href="/niva-1">Nivå 1</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/niva-2" aria-current="page" className="current" data-color="neutral">Nivå 2</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
  breadcrumbsFlat: (
    <Breadcrumbs aria-label="Du er her:">
      <BreadcrumbsList>
        <BreadcrumbsItem><BreadcrumbsLink href="/">Hjem</BreadcrumbsLink></BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  ),
  breadcrumbsLinkAsChild: (
    <Breadcrumbs.Link className="extra" asChild>
      <a href="/ruter" data-router>Ruter</a>
    </Breadcrumbs.Link>
  ),
  paginationBasic: (
    <Pagination aria-label="Sidenavigering" data-current="2" data-total="5" className="extra" data-size="sm">
      <Pagination.List className="list">
        <Pagination.Item className="dropped"><Pagination.Button aria-label="Forrige side">Forrige</Pagination.Button></Pagination.Item>
        <Pagination.Item><Pagination.Button>1</Pagination.Button></Pagination.Item>
        <Pagination.Item><Pagination.Button aria-current="true" variant="primary">2</Pagination.Button></Pagination.Item>
        <Pagination.Item><Pagination.Button>3</Pagination.Button></Pagination.Item>
        <Pagination.Item><Pagination.Button aria-label="Neste side">Neste</Pagination.Button></Pagination.Item>
      </Pagination.List>
    </Pagination>
  ),
  paginationFlat: (
    <Pagination aria-label="Sider">
      <PaginationList>
        <PaginationItem><PaginationButton data-color="neutral">1</PaginationButton></PaginationItem>
      </PaginationList>
    </Pagination>
  ),
  paginationAsChild: (
    <Pagination aria-label="Sider" className="extra" asChild>
      <nav>
        <Pagination.List asChild>
          <ol>
            <Pagination.Item className="dropped" asChild>
              <li data-own><a href="/side/1">1</a></li>
            </Pagination.Item>
          </ol>
        </Pagination.List>
      </nav>
    </Pagination>
  ),
  paginationHook: <PaginationHook />,
  dialog: <Dialog>Innhold</Dialog>,
  dialogOptions: (
    <>
      <Dialog closeButton={false} modal={false} placement="right" id="d1" className="extra" closedby="any" data-color="danger" data-size="lg">
        <Dialog.Block className="block">Topp</Dialog.Block>
        <Dialog.Block>Bunn</Dialog.Block>
      </Dialog>
      <Dialog closeButton="Lukk" placement="bottom">Egen etikett</Dialog>
    </>
  ),
  dialogOpen: <Dialog open>Åpen</Dialog>,
  dialogNonModalOpen: <Dialog open modal={false}>Åpen</Dialog>,
  dialogTrigger: (
    <Dialog.TriggerContext>
      <Dialog.Trigger variant="secondary" className="extra">Åpne</Dialog.Trigger>
      <Dialog>Innhold</Dialog>
    </Dialog.TriggerContext>
  ),
  dialogTriggerAsChild: (
    <Dialog.TriggerContext>
      <Dialog.Trigger className="extra" asChild>
        <a href="#d">Åpne</a>
      </Dialog.Trigger>
      <Dialog>Innhold</Dialog>
    </Dialog.TriggerContext>
  ),
  dialogFlat: (
    <DialogTriggerContext>
      <DialogTrigger>Åpne</DialogTrigger>
      <Dialog><DialogBlock>Innhold</DialogBlock></Dialog>
    </DialogTriggerContext>
  ),
  dialogBlockAsChild: (
    <Dialog.Block className="extra" asChild>
      <section>Seksjon</section>
    </Dialog.Block>
  ),
  popover: (
    <Popover.TriggerContext>
      <Popover.Trigger>Åpne</Popover.Trigger>
      <Popover>Innhold</Popover>
    </Popover.TriggerContext>
  ),
  popoverOptions: (
    <Popover.TriggerContext>
      <Popover.Trigger variant="secondary" data-size="sm">Åpne</Popover.Trigger>
      <Popover id="p1" variant="tinted" placement="bottom-start" autoPlacement={false} className="extra" data-color="danger">Innhold</Popover>
    </Popover.TriggerContext>
  ),
  popoverInline: (
    <Popover.TriggerContext>
      <p>Les om <Popover.Trigger inline className="extra">dette</Popover.Trigger>.</p>
      <Popover>Forklaring</Popover>
    </Popover.TriggerContext>
  ),
  popoverTriggerProps: (
    <>
      <Popover.Trigger popoverTarget="p2" id="dropped">Åpne</Popover.Trigger>
      <Popover.Trigger>Uten kontekst</Popover.Trigger>
      <Popover id="p2">Innhold</Popover>
      <Popover>Uten id</Popover>
    </>
  ),
  popoverTriggerAsChild: (
    <Popover.TriggerContext>
      <Popover.Trigger className="extra" asChild>
        <span role="button" tabIndex={0}>Åpne</span>
      </Popover.Trigger>
      <Popover>Innhold</Popover>
    </Popover.TriggerContext>
  ),
  popoverOpen: (
    <Popover.TriggerContext>
      <Popover.Trigger>Åpne</Popover.Trigger>
      <Popover open>Innhold</Popover>
    </Popover.TriggerContext>
  ),
  popoverAsChild: (
    <Popover.TriggerContext>
      <Popover.Trigger>Åpne</Popover.Trigger>
      <Popover className="extra" asChild>
        <section>Innhold</section>
      </Popover>
    </Popover.TriggerContext>
  ),
  popoverFlat: (
    <PopoverTriggerContext>
      <PopoverTrigger>Åpne</PopoverTrigger>
      <Popover>Innhold</Popover>
    </PopoverTriggerContext>
  ),
  dropdown: (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger variant="secondary">Meny</Dropdown.Trigger>
      <Dropdown className="extra" data-size="sm">
        <Dropdown.Heading>Overskrift</Dropdown.Heading>
        <Dropdown.List className="list">
          <Dropdown.Item className="item"><Dropdown.Button>Valg 1</Dropdown.Button></Dropdown.Item>
          <Dropdown.Item><Dropdown.Button data-color="danger" disabled>Valg 2</Dropdown.Button></Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
  dropdownFlat: (
    <DropdownTriggerContext>
      <DropdownTrigger inline>Meny</DropdownTrigger>
      <Dropdown id="dd" placement="top">
        <DropdownHeading level={3}>Overskrift</DropdownHeading>
        <DropdownList>
          <DropdownItem><DropdownButton>Valg</DropdownButton></DropdownItem>
        </DropdownList>
      </Dropdown>
    </DropdownTriggerContext>
  ),
  dropdownOpen: (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger>Meny</Dropdown.Trigger>
      <Dropdown open><Dropdown.List><Dropdown.Item>Valg</Dropdown.Item></Dropdown.List></Dropdown>
    </Dropdown.TriggerContext>
  ),
  dropdownHeading: (
    <>
      <Dropdown.Heading level={4} data-size="xs" className="extra">Liten</Dropdown.Heading>
      <Dropdown.Heading className="extra" asChild>
        <p>Som avsnitt</p>
      </Dropdown.Heading>
    </>
  ),
  tooltip: (
    <Tooltip content="Slett">
      <button className="own">X</button>
    </Tooltip>
  ),
  tooltipText: <Tooltip content="Sist endret 3. mars">i går</Tooltip>,
  tooltipOptions: (
    <>
      <Tooltip content="Lagre" placement="bottom" autoPlacement={false} open type="labelledby" className="extra" data-color="neutral" data-size="sm">
        Tekst
      </Tooltip>
      <Tooltip content="Av" open={false} type="describedby">Lukket</Tooltip>
    </>
  ),
};

describe('parity', () => {
  for (const [name, react] of Object.entries(stories)) {
    test(name, async () => {
      const out = await both(react, (S as unknown as Record<string, Snippet>)[name]);
      expect(out.svelte).toBe(out.react);
    });
  }
});

// Mounts a stateful story component and returns its container and exports.
function render<T extends Record<string, any>>(component: any, props: Record<string, unknown> = {}) {
  const target = document.body.appendChild(document.createElement('div'));
  const app = mount(component, { target, props }) as T;
  flushSync();
  cleanups.push(async () => {
    await unmount(app);
    target.remove();
  });
  return { target, app };
}
const cleanups: (() => Promise<void>)[] = [];
afterEach(async () => {
  for (const cleanup of cleanups.splice(0)) await cleanup();
});

const click = (el: Element) => {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  flushSync();
};
const isShown = (el: Element) => (el as HTMLElement).style.display === 'block';

describe('Dialog', () => {
  type Exports = { getOpen(): boolean | undefined; setOpen(value: boolean | undefined): void };

  test('bind:open opens and closes it; onClose only when the user closes it', async () => {
    const onClose = vi.fn();
    const { target, app } = render<Exports>(DialogBound, { open: false, onClose });
    const dialog = target.querySelector('dialog')!;
    expect(dialog.open).toBe(false);

    app.setOpen(true);
    flushSync();
    expect(dialog.open).toBe(true);

    app.setOpen(false);
    flushSync();
    expect(dialog.open).toBe(false);
    await macrotask();
    expect(onClose).not.toHaveBeenCalled();

    app.setOpen(true);
    flushSync();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(dialog.open).toBe(false);
    await macrotask();
    flushSync();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0]).toBeInstanceOf(Event);
    expect(app.getOpen()).toBe(false);
  });

  test('Dialog.Trigger opens the dialog in its TriggerContext, modal or not', () => {
    const showModal = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    const show = vi.spyOn(HTMLDialogElement.prototype, 'show');
    const modal = render(DialogBound);
    click(modal.target.querySelector('[aria-haspopup="dialog"]')!);
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(modal.target.querySelector('dialog')!.open).toBe(true);

    const nonModal = render(DialogBound, { modal: false });
    click(nonModal.target.querySelector('[aria-haspopup="dialog"]')!);
    expect(show).toHaveBeenCalledTimes(1);
    expect(nonModal.target.querySelector('dialog')!.open).toBe(true);
    showModal.mockRestore();
    show.mockRestore();
  });
});

describe('Popover', () => {
  type Exports = { getOpen(): boolean | undefined; setOpen(value: boolean | undefined): void };

  test('bind:open follows clicks on the trigger and outside, with onOpen and onClose', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { target, app } = render<Exports>(PopoverBound, { open: false, onOpen, onClose });
    const trigger = target.querySelector('[popovertarget]')!;
    const popover = target.querySelector('[popover]')!;
    expect(isShown(popover)).toBe(false);

    click(trigger);
    expect(app.getOpen()).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(isShown(popover)).toBe(true);

    click(popover.querySelector('button')!);
    expect(app.getOpen()).toBe(true);

    click(target.querySelector('p')!);
    expect(app.getOpen()).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(isShown(popover)).toBe(false);

    app.setOpen(true);
    flushSync();
    expect(isShown(popover)).toBe(true);
    app.setOpen(false);
    flushSync();
    expect(isShown(popover)).toBe(false);
  });

  test('opens and closes from its trigger without bind:open', () => {
    const onOpen = vi.fn();
    const { target } = render(PopoverBound, { onOpen });
    const popover = target.querySelector('[popover]')!;
    click(target.querySelector('[popovertarget]')!);
    expect(isShown(popover)).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);
    click(target.querySelector('[popovertarget]')!);
    expect(isShown(popover)).toBe(false);
  });

  test('announces its trigger to designsystemet-web when it opens', () => {
    const { target, app } = render<Exports>(PopoverBound, { open: false });
    const popover = target.querySelector('[popover]')!;
    const sources: unknown[] = [];
    popover.addEventListener('ds-toggle-source', (event) => sources.push((event as CustomEvent).detail));
    app.setOpen(true);
    flushSync();
    expect(sources).toEqual([target.querySelector('[popovertarget]')]);
  });
});

describe('Dropdown', () => {
  test('each Dropdown.TriggerContext links its trigger to its dropdown, by generated or own id', () => {
    const onOpen = vi.fn();
    const { target } = render(DropdownContext, { onOpen });
    const [first, second] = target.querySelectorAll('[popovertarget]');
    const [one, two] = target.querySelectorAll('.ds-dropdown');
    expect(first.getAttribute('popovertarget')).toBe(one.id);
    expect(one.id).toBeTruthy();
    expect(second.getAttribute('popovertarget')).toBe('egen');
    expect(two.id).toBe('egen');

    click(first);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(isShown(one)).toBe(true);
    expect(isShown(two)).toBe(false);
  });
});

describe('Tabs', () => {
  type Exports = { getValue(): string | undefined; setValue(value: string | undefined): void };
  const selected = (target: Element) => [...target.querySelectorAll('[role="tab"]')].map((tab) => tab.getAttribute('aria-selected'));

  test('bind:value changes on click, with onChange, and selects the tab', () => {
    const onChange = vi.fn();
    const { target, app } = render<Exports>(TabsBound, { value: '1', onChange });
    expect(selected(target)).toEqual(['true', 'false']);

    const tab = target.querySelectorAll('[role="tab"]')[1];
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    tab.dispatchEvent(event);
    flushSync();
    // Controlled: designsystemet-web is kept from switching by itself.
    expect(event.defaultPrevented).toBe(true);
    expect(onChange).toHaveBeenCalledExactlyOnceWith('2');
    expect(app.getValue()).toBe('2');
    expect(selected(target)).toEqual(['false', 'true']);

    click(tab);
    expect(onChange).toHaveBeenCalledTimes(1);

    app.setValue('1');
    flushSync();
    expect(selected(target)).toEqual(['true', 'false']);
  });

  test('without value, starts at defaultValue and follows clicks', () => {
    const onChange = vi.fn();
    const { target } = render(TabsBound, { defaultValue: '2', onChange });
    expect(selected(target)).toEqual(['false', 'true']);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    target.querySelectorAll('[role="tab"]')[0].dispatchEvent(event);
    flushSync();
    expect(event.defaultPrevented).toBe(false);
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1');
    expect(selected(target)).toEqual(['true', 'false']);
  });
});

describe('pagination()', () => {
  type Result = ReturnType<typeof pagination>;

  // React's usePagination output, captured from a component, with onClick under Svelte's name.
  async function usePaginationOutput(props: Parameters<typeof usePagination>[0]) {
    let output: ReturnType<typeof usePagination> | undefined;
    function Capture() {
      output = usePagination(props);
      return null;
    }
    const root = createRoot(document.createElement('div'));
    await act(async () => root.render(<Capture />));
    await act(async () => root.unmount());
    return output!;
  }

  // Handlers compared by name only (React's onClick is our onclick); their behaviour is tested below.
  const shape = (result: Result | ReturnType<typeof usePagination>) =>
    JSON.parse(JSON.stringify(result, (_, value) => (typeof value === 'function' ? 'handler' : value)).replaceAll('"onClick":', '"onclick":'));

  const inputs = [
    { currentPage: 1, totalPages: 1 },
    { currentPage: 1, totalPages: 10 },
    { currentPage: 4, totalPages: 10 },
    { currentPage: 6, totalPages: 12, showPages: 5 },
    { currentPage: 10, totalPages: 10, showPages: 9 },
    { currentPage: 3, totalPages: 5, showPages: 3 },
    { currentPage: 50, totalPages: 100, showPages: 4 },
  ];

  for (const input of inputs) {
    test(`matches usePagination for ${JSON.stringify(input)}`, async () => {
      expect(shape(pagination(input))).toEqual(shape(await usePaginationOutput(input)));
    });
  }

  test('buttons call onChange and setCurrentPage, as usePagination does', async () => {
    const run = (handlers: { onclick?: (e: MouseEvent) => void; onClick?: (e: any) => void }, event: MouseEvent) =>
      (handlers.onclick ?? handlers.onClick)!(event);
    const calls = async (prevent: boolean) => {
      const log: { react: unknown[]; svelte: unknown[] } = { react: [], svelte: [] };
      for (const side of ['react', 'svelte'] as const) {
        const input = {
          currentPage: 1,
          totalPages: 3,
          setCurrentPage: (page: number) => log[side].push(['set', page]),
          onChange: (event: { preventDefault(): void }, page: number) => {
            log[side].push(['change', page]);
            if (prevent) event.preventDefault();
          },
        };
        const result: any = side === 'svelte' ? pagination(input) : await usePaginationOutput(input as any);
        for (const handlers of [result.prevButtonProps, result.pages[1].buttonProps, result.nextButtonProps]) {
          const event = new MouseEvent('click', { cancelable: true });
          run(handlers, event);
          log[side].push(['prevented', event.defaultPrevented]);
        }
      }
      return log;
    };
    for (const prevent of [false, true]) {
      const log = await calls(prevent);
      expect(log.svelte).toEqual(log.react);
      expect(log.svelte.length).toBeGreaterThan(3);
    }
  });
});
