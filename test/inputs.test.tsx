import {
  EXPERIMENTAL_FileUpload,
  EXPERIMENTAL_Suggestion,
  EXPERIMENTAL_SuggestionClear,
  EXPERIMENTAL_SuggestionEmpty,
  EXPERIMENTAL_SuggestionInput,
  EXPERIMENTAL_SuggestionList,
  EXPERIMENTAL_SuggestionOption,
  EXPERIMENTAL_SuggestionToggle,
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryLink,
  ErrorSummaryList,
  Field,
  Input,
  Label,
  Search,
  SearchButton,
  SearchClear,
  SearchInput,
} from '@digdir/designsystemet-react';
import { act, useState, type ComponentProps, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, tick, unmount, type Component, type Snippet } from 'svelte';
import { describe, expect, test, vi } from 'vitest';
import { both, canonical } from './parity';
import * as S from './stories/inputs.svelte';
import SearchBound from './stories/inputs/SearchBound.svelte';
import SuggestionBound from './stories/inputs/SuggestionBound.svelte';
import SuggestionRerender from './stories/inputs/SuggestionRerender.svelte';

const Suggestion = EXPERIMENTAL_Suggestion;

const stories: Record<Exclude<keyof typeof S, 'default'>, ReactElement> = {
  search: (
    <Search>
      <Search.Input aria-label="Søk" />
      <Search.Clear />
      <Search.Button />
    </Search>
  ),
  searchOptions: (
    <form>
      <Search className="extra" data-size="sm" data-color="neutral" data-sr-clear="Tøm">
        <Search.Input type="text" name="q" defaultValue="sykehus" placeholder="Søk i prosjekter" />
        <Search.Clear aria-label="Tøm søket" />
        <Search.Button variant="secondary" data-size="lg">Finn</Search.Button>
      </Search>
    </form>
  ),
  searchFlat: (
    <Search>
      <SearchInput aria-label="Søk" />
      <SearchClear />
      <SearchButton icon aria-label="Søk"><svg /></SearchButton>
      <SearchButton type="button" asChild>
        <a href="/sok">Avansert</a>
      </SearchButton>
    </Search>
  ),
  errorSummary: (
    <ErrorSummary>
      <ErrorSummary.Heading>Rett opp feilene for å gå videre</ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#navn">Skriv et navn</ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#areal">Skriv arealet som et tall</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
  ),
  errorSummaryOptions: (
    <>
      <ErrorSummary className="extra" data-size="sm" data-color="warning" aria-label="Feil">
        <ErrorSummary.Heading level={3} data-size="xs" className="h">Feil</ErrorSummary.Heading>
        <ErrorSummary.List className="l" data-size="lg">
          <ErrorSummary.Item className="i">
            <ErrorSummary.Link href="#a" data-color="danger" className="a">Feil i A</ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
      <ErrorSummary asChild>
        <section><h2>Som section</h2></section>
      </ErrorSummary>
    </>
  ),
  errorSummaryFlat: (
    <ErrorSummary>
      <ErrorSummaryHeading asChild><h4>Overskrift</h4></ErrorSummaryHeading>
      <ErrorSummaryList>
        <ErrorSummaryItem asChild>
          <li data-x="y"><ErrorSummaryLink href="#b">Feil i B</ErrorSummaryLink></li>
        </ErrorSummaryItem>
        <ErrorSummaryItem>
          <ErrorSummaryLink asChild><button>Feil i C</button></ErrorSummaryLink>
        </ErrorSummaryItem>
      </ErrorSummaryList>
    </ErrorSummary>
  ),
  fileUpload: (
    <EXPERIMENTAL_FileUpload className="extra" data-size="sm" id="opplasting">
      <Field>
        <Label>Last opp tegninger</Label>
        <Field.Description>PDF eller DWG, maks 10 MB</Field.Description>
        <Input type="file" multiple accept=".pdf,.dwg" />
      </Field>
    </EXPERIMENTAL_FileUpload>
  ),
  suggestion: (
    <Field>
      <Label>Kommune</Label>
      <Suggestion>
        <Suggestion.Input />
        <Suggestion.Clear />
        <Suggestion.List>
          <Suggestion.Empty>Ingen treff</Suggestion.Empty>
          <Suggestion.Option value="0301">Oslo</Suggestion.Option>
          <Suggestion.Option value="4601">Bergen</Suggestion.Option>
          <Suggestion.Option value="5001" label="Trondheim">Trondheim (Trøndelag)</Suggestion.Option>
        </Suggestion.List>
      </Suggestion>
    </Field>
  ),
  suggestionSelected: (
    <>
      <Suggestion defaultSelected={{ label: 'Bergen', value: '4601' }} name="kommune" id="kommune">
        <Suggestion.Input aria-label="Kommune" />
        <Suggestion.List>
          <Suggestion.Option value="0301">Oslo</Suggestion.Option>
          <Suggestion.Option value="4601">Bergen</Suggestion.Option>
        </Suggestion.List>
      </Suggestion>
      <Suggestion selected="Oslo" name="by">
        <Suggestion.Input aria-label="By" />
        <Suggestion.List>
          <Suggestion.Option>Oslo</Suggestion.Option>
          <Suggestion.Option>Bergen</Suggestion.Option>
        </Suggestion.List>
      </Suggestion>
    </>
  ),
  suggestionMultiple: (
    <Suggestion
      multiple
      defaultSelected={['Oslo', { label: 'Bergen', value: '4601' }]}
      name="kommuner"
      className="extra"
      data-size="sm"
      renderSelected={({ label, value }) => <b data-value={value}>{label}</b>}
    >
      <Suggestion.Input aria-label="Kommuner" />
      <Suggestion.Toggle />
      <Suggestion.List>
        <Suggestion.Option>Oslo</Suggestion.Option>
        <Suggestion.Option value="4601">Bergen</Suggestion.Option>
        <Suggestion.Option value="1103">Stavanger</Suggestion.Option>
      </Suggestion.List>
    </Suggestion>
  ),
  suggestionCreatable: (
    <Suggestion creatable multiple data-sr-singular="%d forslag" data-sr-plural="%d forslag" data-sr-clear="Tøm">
      <Suggestion.Input aria-label="Stikkord" />
      <Suggestion.Clear />
      <Suggestion.List>
        <Suggestion.Empty data-empty="Opprett «%s»" />
        <Suggestion.Option>Bygg</Suggestion.Option>
      </Suggestion.List>
    </Suggestion>
  ),
  suggestionParts: (
    <Suggestion data-color="neutral" data-sr-clear="Tøm">
      <Suggestion.Input aria-label="Del" placeholder="Velg" className="i" data-size="lg" disabled />
      <Suggestion.Clear aria-label="Fjern" className="c">x</Suggestion.Clear>
      <Suggestion.Toggle aria-label="Vis alle" className="t" />
      <Suggestion.List className="l" singular="%d treff" plural="%d treff" id="liste" autoPlacement={false} data-size="sm">
        <Suggestion.Empty className="e" data-color="danger">Ingen</Suggestion.Empty>
        <Suggestion.Option value="a" label="A" className="o" disabled data-size="sm">Alfa</Suggestion.Option>
      </Suggestion.List>
    </Suggestion>
  ),
  suggestionFilter: (
    <>
      <Suggestion filter={false}>
        <Suggestion.Input aria-label="Uten filter" />
        <Suggestion.List><Suggestion.Option>Oslo</Suggestion.Option></Suggestion.List>
      </Suggestion>
      <Suggestion defaultSelected="Oslo" filter={({ index }) => index > 0}>
        <Suggestion.Input aria-label="Med filter" />
        <Suggestion.List>
          <Suggestion.Option>Oslo</Suggestion.Option>
          <Suggestion.Option>Bergen</Suggestion.Option>
        </Suggestion.List>
      </Suggestion>
    </>
  ),
  suggestionFlat: (
    <Suggestion>
      <EXPERIMENTAL_SuggestionInput aria-label="Flat" />
      <EXPERIMENTAL_SuggestionClear />
      <EXPERIMENTAL_SuggestionToggle />
      <EXPERIMENTAL_SuggestionList>
        <EXPERIMENTAL_SuggestionEmpty>Ingen</EXPERIMENTAL_SuggestionEmpty>
        <EXPERIMENTAL_SuggestionOption>Oslo</EXPERIMENTAL_SuggestionOption>
      </EXPERIMENTAL_SuggestionList>
    </Suggestion>
  ),
  suggestionInputValue: (
    <Suggestion>
      <Suggestion.Input aria-label="Med value" value="Oslo" onChange={() => {}} />
      <Suggestion.List><Suggestion.Option>Oslo</Suggestion.Option></Suggestion.List>
    </Suggestion>
  ),
};

for (const [name, react] of Object.entries(stories)) {
  test(name, async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const out = await both(react, (S as unknown as Record<string, Snippet>)[name]);
    expect(out.svelte).toBe(out.react);
    // Suggestion.Input warns about `value` and `onchange`, once per render in React and once here.
    expect(new Set(warn.mock.calls.map(String)).size).toBe(name === 'suggestionInputValue' ? 2 : 0);
    warn.mockRestore();
  });
}

// Interaction: the same steps on React and on Svelte, comparing the DOM after each step, and the callbacks.

/** Lets the web components' timers, observers and the frameworks' updates run. */
const settle = async () => {
  for (let i = 0; i < 3; i++) await new Promise((resolve) => setTimeout(resolve, 0));
  flushSync();
  await tick();
};

type Mounted = { root: HTMLElement; markup: () => string; output: () => unknown; destroy: () => Promise<void> };

async function mountReact(element: ReactElement): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const reactRoot = createRoot(root);
  await act(async () => reactRoot.render(<div className="story">{element}</div>));
  await act(settle);
  return {
    root,
    markup: () => canonical(root.querySelector('.story')!),
    output: () => undefined,
    destroy: async () => {
      await act(async () => reactRoot.unmount());
      root.remove();
    },
  };
}

async function mountSvelte<P extends Record<string, any>>(component: Component<P>, props: P): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const app = mount(component, { target: root, props });
  await settle();
  return {
    root,
    markup: () => canonical(root.querySelector('.story')!),
    output: () => JSON.parse(root.querySelector('output')!.textContent!),
    destroy: async () => {
      await unmount(app);
      root.remove();
    },
  };
}

const input = (root: HTMLElement) => root.querySelector('input')!;
const type = (root: HTMLElement, text: string) => {
  const el = input(root);
  el.focus();
  el.value = text;
  el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
};
const enter = (root: HTMLElement) => input(root).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
const click = (el: Element) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
const disabled = (root: HTMLElement) => [...root.querySelectorAll('u-option:not([data-empty])')].map((o) => (o as HTMLOptionElement).disabled);

/** Runs the steps on one side, returning the DOM after each, and leaves it mounted for further checks. */
async function run(side: Mounted, actions: ((root: HTMLElement) => void)[], wrap: (fn: () => Promise<void>) => Promise<void>) {
  const markups = [side.markup()];
  for (const action of actions) {
    await wrap(async () => {
      action(side.root);
      await settle();
    });
    markups.push(side.markup());
  }
  return markups;
}

/** Runs each step on React, then on Svelte (one at a time, as they share focus and timers), and compares the DOMs. */
async function steps(react: () => Promise<Mounted>, svelte: () => Promise<Mounted>, actions: ((root: HTMLElement) => void)[]) {
  const r = await react();
  const expected = await run(r, actions, (fn) => act(fn));
  await r.destroy();
  const s = await svelte();
  const received = await run(s, actions, (fn) => fn());
  expect(received.join('\n\n')).toBe(expected.join('\n\n'));
  return s;
}

const ReactSuggestion = (props: Omit<ComponentProps<typeof Suggestion>, 'children'>) => (
  <Suggestion {...(props as ComponentProps<typeof Suggestion>)}>
    <Suggestion.Input aria-label="Kommune" />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Option value="0301">Oslo</Suggestion.Option>
      <Suggestion.Option value="4601">Bergen</Suggestion.Option>
      <Suggestion.Option value="1804">Bodø</Suggestion.Option>
      <Suggestion.Empty>Ingen treff</Suggestion.Empty>
    </Suggestion.List>
  </Suggestion>
);

describe('Suggestion', () => {
  test('filters the options by the typed text', async () => {
    const svelte = await steps(() => mountReact(<ReactSuggestion />), () => mountSvelte(SuggestionBound, {}), [
      (root) => type(root, 'b'),
      (root) => type(root, 'BER '),
      (root) => type(root, ''),
      (root) => type(root, 'bo'),
    ]);
    expect(disabled(svelte.root)).toEqual([true, true, false]);
    await svelte.destroy();
  });

  test('filter={false}', async () => {
    const svelte = await steps(() => mountReact(<ReactSuggestion filter={false} />), () => mountSvelte(SuggestionBound, { filter: false }), [(root) => type(root, 'o')]);
    expect(disabled(svelte.root)).toEqual([false, false, false]);
    await svelte.destroy();
  });

  test('a filter function', async () => {
    const filter = vi.fn(({ value }: { value: string }) => value !== '4601');
    const svelte = await steps(() => mountReact(<ReactSuggestion filter={filter} />), () => mountSvelte(SuggestionBound, { filter }), [(root) => type(root, 'o')]);
    expect(disabled(svelte.root)).toEqual([false, true, false]);
    const call = filter.mock.calls.at(-1)![0] as any;
    expect(call).toMatchObject({ index: 2, label: 'Bodø', text: 'Bodø', value: '1804' });
    expect(call.input).toBe(input(svelte.root));
    expect(call.optionElement.tagName).toBe('U-OPTION');
    await svelte.destroy();
  });

  test('selects, binds `selected`, calls onSelectedChange, and clears', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactSuggestion name="kommune" onSelectedChange={onReact} />),
      () => mountSvelte(SuggestionBound, { name: 'kommune', onSelectedChange: onSvelte }),
      [(root) => type(root, 'bergen'), enter],
    );
    expect(onSvelte.mock.calls).toEqual([[{ label: 'Bergen', value: '4601' }]]);
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(svelte.output()).toEqual({ label: 'Bergen', value: '4601' });
    expect(input(svelte.root).value).toBe('Bergen');
    expect((svelte.root.querySelector('select') as HTMLSelectElement).value).toBe('4601');
    click(svelte.root.querySelector('button[type=reset]')!);
    await settle();
    expect(onSvelte.mock.calls.at(-1)).toEqual([null]);
    expect(svelte.output()).toBe(null);
    expect(svelte.root.querySelector('data')).toBe(null);
    await svelte.destroy();
  });

  test('clears like React', async () => {
    const svelte = await steps(
      () => mountReact(<ReactSuggestion defaultSelected={{ label: 'Oslo', value: '0301' }} />),
      () => mountSvelte(SuggestionBound, { selected: { label: 'Oslo', value: '0301' } }),
      [(root) => click(root.querySelector('button[type=reset]')!)],
    );
    expect(svelte.output()).toBe(null);
    await svelte.destroy();
  });

  test('defaultSelected: starts with it, then the user decides', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactSuggestion defaultSelected="Oslo" onSelectedChange={onReact} />),
      () => mountSvelte(SuggestionBound, { bind: false, defaultSelected: 'Oslo', onSelectedChange: onSvelte }),
      [(root) => type(root, 'Bodø'), enter, (root) => click(root.querySelector('button[type=reset]')!)],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls).toEqual([[{ label: 'Bodø', value: '1804' }], [null]]);
    expect(svelte.root.querySelector('data')).toBe(null);
    await svelte.destroy();
  });

  for (const multiple of [false, true]) {
    test(`selected${multiple ? ' (multiple)' : ''}, not bound: a choice calls onSelectedChange, and the items stay`, async () => {
      const onReact = vi.fn();
      const onSvelte = vi.fn();
      const selected = multiple ? ['Oslo'] : 'Oslo';
      const svelte = await steps(
        () => mountReact(<ReactSuggestion multiple={multiple as false} selected={selected as string} onSelectedChange={onReact} />),
        () => mountSvelte(SuggestionBound, { bind: false, multiple, selected, onSelectedChange: onSvelte }),
        [(root) => type(root, 'Bodø'), enter, (root) => click(root.querySelector('button[type=reset]')!)],
      );
      expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
      expect(onSvelte.mock.calls[0]).toEqual([multiple ? [{ label: 'Oslo', value: 'Oslo' }, { label: 'Bodø', value: '1804' }] : { label: 'Bodø', value: '1804' }]);
      expect(svelte.root.querySelector('data')!.value).toBe('Oslo');
      expect(svelte.output()).toEqual(selected);
      await svelte.destroy();
    });
  }

  test('starts from `selected` and replaces it', async () => {
    const svelte = await steps(
      () => mountReact(<ReactSuggestion defaultSelected="Oslo" />),
      () => mountSvelte(SuggestionBound, { selected: 'Oslo' }),
      [(root) => type(root, 'Bodø'), enter],
    );
    expect(svelte.output()).toEqual({ label: 'Bodø', value: '1804' });
    await svelte.destroy();
  });

  test('multiple: adds and removes items', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactSuggestion multiple defaultSelected={['0301']} onSelectedChange={onReact} />),
      () => mountSvelte(SuggestionBound, { multiple: true, selected: ['0301'], onSelectedChange: onSvelte }),
      [(root) => type(root, 'Bodø'), enter, (root) => click(root.querySelector('data')!)],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls.length).toBe(2);
    expect(svelte.output()).toEqual(onSvelte.mock.calls[1][0]);
    await svelte.destroy();
  });

  test('creatable: creates an item from the typed text', async () => {
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactSuggestion multiple creatable />),
      () => mountSvelte(SuggestionBound, { multiple: true, creatable: true, onSelectedChange: onSvelte }),
      [(root) => type(root, 'Tromsø'), enter],
    );
    expect(onSvelte).toHaveBeenCalledWith([{ label: 'Tromsø', value: 'Tromsø' }]);
    expect(svelte.output()).toEqual([{ label: 'Tromsø', value: 'Tromsø' }]);
    await svelte.destroy();
  });

  test('onBeforeMatch gets the matching option, and can cancel the match', async () => {
    const seen: string[] = [];
    const cancel = (event: { detail: HTMLOptionElement | undefined; preventDefault: () => void; currentTarget: Element }) => {
      seen.push(`${event.detail?.textContent} in ${event.currentTarget.tagName}`);
      event.preventDefault();
    };
    const svelte = await steps(
      () => mountReact(<ReactSuggestion onBeforeMatch={cancel} />),
      () => mountSvelte(SuggestionBound, { onBeforeMatch: cancel }),
      [(root) => type(root, 'oslo'), enter],
    );
    expect(seen.length).toBeGreaterThan(0);
    expect(seen.slice(seen.length / 2)).toEqual(seen.slice(0, seen.length / 2));
    expect(seen.at(-1)).toBe('Oslo in DS-SUGGESTION');
    await svelte.destroy();
  });

  test('re-filters when the Suggestion is rendered again, as React re-filters on every render of the list', async () => {
    function Rerender() {
      const [count, setCount] = useState(0);
      return (
        <>
          <Suggestion data-count={count}>
            <Suggestion.Input aria-label="Kommune" />
            <Suggestion.List>
              <Suggestion.Option value="0301">Oslo</Suggestion.Option>
              <Suggestion.Option value="4601">Bergen</Suggestion.Option>
              <Suggestion.Option value="1804">Bodø</Suggestion.Option>
              <Suggestion.Empty>Ingen treff</Suggestion.Empty>
            </Suggestion.List>
          </Suggestion>
          <button type="button" className="rerender" onClick={() => setCount(count + 1)}>
            Oppdater
          </button>
        </>
      );
    }
    // The input's value set by a script, without an input event: only a new render filters by it.
    const setQuietly = (root: HTMLElement) => void (input(root).value = 'o');
    const svelte = await steps(() => mountReact(<Rerender />), () => mountSvelte(SuggestionRerender, {}), [
      (root) => type(root, 'b'),
      setQuietly,
      (root) => click(root.querySelector('.rerender')!),
    ]);
    expect(disabled(svelte.root)).toEqual([false, true, false]);
    await svelte.destroy();
  });

  test('re-filters when the options change', async () => {
    const svelte = await mountSvelte(SuggestionBound, {});
    type(svelte.root, 'tr');
    await settle();
    expect(disabled(svelte.root)).toEqual([true, true, true]);
    await svelte.destroy();
  });
});

describe('Search', () => {
  test('binds `value`, and the clear button empties it', async () => {
    const svelte = await steps(
      () =>
        mountReact(
          <Search>
            <Search.Input aria-label="Søk" />
            <Search.Clear />
            <Search.Button />
          </Search>,
        ),
      () => mountSvelte(SearchBound, { value: '' }),
      [(root) => type(root, 'sykehus')],
    );
    expect(svelte.root.querySelector('button[type=reset]')!.hasAttribute('hidden')).toBe(false);
    expect(svelte.output()).toBe('sykehus');
    click(svelte.root.querySelector('button[type=reset]')!);
    await settle();
    expect(input(svelte.root).value).toBe('');
    expect(svelte.output()).toBe('');
    expect(svelte.root.querySelector('button[type=reset]')!.hasAttribute('hidden')).toBe(true);
    await svelte.destroy();
  });
});
