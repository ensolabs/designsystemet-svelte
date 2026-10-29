// Combobox (deprecated upstream), React and Svelte side by side: the same steps on each, comparing the DOM after each
// step (the Combobox and its list, which is portalled to the body), and the onValueChange calls.
import { Combobox } from '@digdir/designsystemet-react';
import { act, useState, type ChangeEvent, type ComponentProps, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, tick, unmount, type Component, type Snippet } from 'svelte';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { canonical } from './parity';
import Host from './Host.svelte';
import ComboboxBound from './stories/combobox/ComboboxBound.svelte';
import ComboboxControlled from './stories/combobox/ComboboxControlled.svelte';
import { cases } from './storybook/cases';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

/** Lets the debounced handlers (20 ms for keys, 50 ms for each selection step), the 1 ms open delay and the
 * positioning frames run. */
const settle = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  flushSync();
  await tick();
};

type Mounted = { root: HTMLElement; markup: () => string; output: () => unknown; destroy: () => Promise<void> };

/** Whatever a failed test left mounted, so the next starts from an empty page. */
const mounted = new Set<Mounted>();
afterEach(async () => {
  for (const side of mounted) await side.destroy();
});
const track = (side: Mounted): Mounted => {
  const destroy = side.destroy;
  side.destroy = async () => {
    if (!mounted.delete(side)) return;
    await destroy();
  };
  mounted.add(side);
  return side;
};

/** The story and its list, if open. */
function markup(root: HTMLElement) {
  const story = root.querySelector('.story') ?? root;
  const lists = [...document.querySelectorAll('[data-floating-ui-portal]')].filter((portal) => !story.contains(portal));
  return [canonical(story), ...lists.map((portal) => canonical(portal.parentElement!).split('\n').length && canonical(wrap(portal)))].join('\n--\n');
}
/** The portal element itself, as canonical text (canonical renders an element's children). */
function wrap(el: Element) {
  const holder = document.createElement('div');
  holder.appendChild(el.cloneNode(true));
  return holder;
}

async function mountReact(element: ReactElement): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const reactRoot = createRoot(root);
  await act(async () => reactRoot.render(<div className="story">{element}</div>));
  await act(settle);
  return track({
    root,
    markup: () => markup(root),
    output: () => undefined,
    destroy: async () => {
      await act(async () => reactRoot.unmount());
      root.remove();
    },
  });
}

async function mountSvelte<P extends Record<string, any>>(component: Component<P>, props: P): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const app = mount(component, { target: root, props });
  await settle();
  return track({
    root,
    markup: () => markup(root),
    output: () => JSON.parse(root.querySelector('output')?.textContent ?? 'null'),
    destroy: async () => {
      await unmount(app);
      root.remove();
    },
  });
}

const story = (name: string) => cases.find((c) => c.file === 'Combobox' && c.name === name)!;
const mountStoryReact = (name: string) => mountReact(story(name).react());
const mountStorySvelte = (name: string) => mountSvelte(Host, { story: story(name).svelte as Snippet });

const input = (root: HTMLElement) => root.querySelector<HTMLInputElement>('input[role=combobox]')!;
/** Types as a user does: through the native setter (React tracks `value` set from code) and an input event. */
const type = (text: string) => (root: HTMLElement) => {
  const el = input(root);
  el.focus();
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(el, text);
  el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
};
const key = (name: string) => (root: HTMLElement) => {
  input(root).focus();
  input(root).dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }));
};
const click = (el: Element | null) => {
  expect(el).not.toBe(null);
  el!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
};
const clickInput = (root: HTMLElement) => {
  input(root).focus();
  click(input(root));
};
const option = (label: string) => () =>
  click([...document.querySelectorAll('[role=option]')].find((el) => el.textContent?.startsWith(label)) ?? null);
const chip = (label: string) => (root: HTMLElement) => click([...root.querySelectorAll('.ds-chip')].find((el) => el.textContent === label) ?? null);
const clear = (root: HTMLElement) => click(root.querySelector('.ds-combobox__clear-button'));
const pressOutside = () => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

/** Runs the steps on one side, returning the DOM after each, and leaves it mounted for further checks. */
async function run(side: Mounted, actions: ((root: HTMLElement) => void)[], wrapper: (fn: () => Promise<void>) => Promise<void>) {
  const markups = [side.markup()];
  for (const action of actions) {
    await wrapper(async () => {
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
  // React's act holds back the renders that timers inside it schedule until it ends: a second act lets their effects
  // (positioning frames) run, as Svelte's run during the first wait.
  const expected = await run(r, actions, async (fn) => {
    await act(fn);
    await act(settle);
  });
  await r.destroy();
  const s = await svelte();
  const received = await run(s, actions, async (fn) => {
    await fn();
    await settle();
  });
  expect(received.join('\n\n====\n\n')).toBe(expected.join('\n\n====\n\n'));
  return s;
}

const PLACES = [
  { name: 'Oslo', value: '0301' },
  { name: 'Bergen', value: '4601' },
  { name: 'Bodø', value: '1804' },
  { name: 'Brønnøysund', value: '1813' },
];

const ReactCombobox = (props: Omit<ComponentProps<typeof Combobox>, 'children'>) => (
  <Combobox label="Kommune" {...props}>
    <Combobox.Empty>Ingen treff</Combobox.Empty>
    {PLACES.map((place) => (
      <Combobox.Option key={place.value} value={place.value}>
        {place.name}
      </Combobox.Option>
    ))}
  </Combobox>
);

/** Both sides with an onValueChange spy each; checks they got the same calls, and returns Svelte's. */
async function withCallbacks(props: Record<string, unknown>, actions: ((root: HTMLElement) => void)[]) {
  const onReact = vi.fn();
  const onSvelte = vi.fn();
  const svelte = await steps(
    () => mountReact(<ReactCombobox {...props} onValueChange={onReact} />),
    () => mountSvelte(ComboboxBound, { ...props, onValueChange: onSvelte }),
    actions,
  );
  expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
  return { svelte, calls: onSvelte.mock.calls };
}

describe('Combobox', { timeout: 60_000 }, () => {
  test('opens and closes: a click on the input, ArrowDown, ArrowUp on the first option, Escape, a press outside', async () => {
    const svelte = await steps(
      () => mountStoryReact('Preview'),
      () => mountStorySvelte('Preview'),
      [clickInput, clickInput, key('ArrowDown'), key('ArrowUp'), key('ArrowDown'), key('Escape'), clickInput, pressOutside],
    );
    expect(document.querySelector('[data-floating-ui-portal]')).toBe(null);
    await svelte.destroy();
  });

  test('typing filters the options, and shows Combobox.Empty when none match', async () => {
    const svelte = await steps(
      () => mountStoryReact('Preview'),
      () => mountStorySvelte('Preview'),
      [type('b'), type('BE'), type('xyz'), type('')],
    );
    await svelte.destroy();
  });

  test('arrow keys move the active option, and Enter selects it', async () => {
    const { svelte, calls } = await withCallbacks({}, [key('ArrowDown'), key('ArrowDown'), key('ArrowDown'), key('ArrowUp'), key('Enter')]);
    expect(calls.at(-1)).toEqual([['4601']]);
    expect(input(svelte.root).value).toBe('Bergen');
    expect(svelte.output()).toEqual(['4601']);
    await svelte.destroy();
  });

  test('typing a label selects its option', async () => {
    const { svelte, calls } = await withCallbacks({}, [type('bodø')]);
    expect(calls.at(-1)).toEqual([['1804']]);
    await svelte.destroy();
  });

  test('a click selects; Backspace removes the selection', async () => {
    const { svelte, calls } = await withCallbacks({}, [clickInput, option('Oslo'), key('Backspace')]);
    expect(calls.at(-1)).toEqual([[]]);
    await svelte.destroy();
  });

  test('multiple: chips, a click on a chip and Backspace remove them', async () => {
    const { svelte, calls } = await withCallbacks({ multiple: true, name: 'kommuner' }, [
      clickInput,
      option('Oslo'),
      option('Bodø'),
      option('Bergen'),
      option('Oslo'),
      chip('Bodø'),
      key('Backspace'),
      type('b'),
      key('Backspace'),
    ]);
    expect(calls.map(([values]) => values)).toEqual([['0301'], ['0301', '1804'], ['0301', '1804', '4601'], ['1804', '4601'], ['4601'], []]);
    expect(svelte.output()).toEqual([]);
    await svelte.destroy();
  });

  test('the clear button clears the selection', async () => {
    const { calls } = await withCallbacks({ multiple: true, initialValue: ['0301', '4601'] }, [clear]);
    expect(calls).toEqual([[[]]]);
    const single = await withCallbacks({ initialValue: ['0301'] }, [clickInput, option('Bergen'), clear, pressOutside]);
    expect(single.calls.at(-1)).toEqual([[]]);
    await single.svelte.destroy();
  });

  test('`value` from outside: the Controlled story', async () => {
    const button = (root: HTMLElement) => click([...root.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Sett verdi til Leikanger')!);
    const svelte = await steps(() => mountStoryReact('Controlled'), () => mountStorySvelte('Controlled'), [button, pressOutside]);
    expect(input(svelte.root).value).toBe('Leikanger');
    await svelte.destroy();
  });

  test('SelectAll: onValueChange changes the value', async () => {
    const svelte = await steps(() => mountStoryReact('SelectAll'), () => mountStorySvelte('SelectAll'), [
      clickInput,
      option('Oslo'),
      option('Alle kommuner'),
    ]);
    await svelte.destroy();
  });

  test('portal={false}, readonly, disabled, error and loading', async () => {
    for (const props of [{ portal: false }, { readOnly: true }, { disabled: true }, { error: 'Feil' }, { loading: true }]) {
      const svelteProps = 'readOnly' in props ? { readonly: true } : props;
      const svelte = await steps(
        () => mountReact(<ReactCombobox {...props} />),
        () => mountSvelte(ComboboxBound, svelteProps),
        [clickInput, key('ArrowDown'), key('Enter')],
      );
      await svelte.destroy();
    }
  });

  test('virtual: the Virtualized story', async () => {
    const svelte = await steps(() => mountStoryReact('Virtualized'), () => mountStorySvelte('Virtualized'), [clickInput, type('ber'), key('ArrowDown')]);
    await svelte.destroy();
  });
});

/** ComboboxControlled.svelte's twin: `value` from a parent that follows onValueChange or not, a button that adds an
 * option between the others, and with `extra` a child that isn't an option. */
function ReactControlled(props: {
  value?: string[];
  follow?: boolean;
  extra?: boolean;
  multiple?: boolean;
  onValueChange?: (value: string[]) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [value, setValue] = useState(props.value);
  const [places, setPlaces] = useState([
    { name: 'Oslo', value: '0301' },
    { name: 'Bergen', value: '4601' },
    { name: 'Bodø', value: '1804' },
  ]);
  return (
    <>
      <button id="add" onClick={() => setPlaces([places[0], { name: 'Lillehammer', value: '3405' }, ...places.slice(1)])}>
        Legg til
      </button>
      <Combobox
        label="Kommune"
        value={value}
        multiple={props.multiple}
        onChange={props.onChange}
        onValueChange={(next) => {
          props.onValueChange?.(next);
          if (props.follow) setValue(next);
        }}
      >
        <Combobox.Empty>Ingen treff</Combobox.Empty>
        {places.map((place) => (
          <Combobox.Option key={place.value} value={place.value}>
            {place.name}
          </Combobox.Option>
        ))}
        {props.extra && <p>Ekstra</p>}
      </Combobox>
    </>
  );
}

describe('Combobox: controlled state and children, as React', { timeout: 60_000 }, () => {
  const add = (root: HTMLElement) => click(root.querySelector('#add'));

  test('uncontrolled: a selection is kept when the options change', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactControlled onValueChange={onReact} />),
      () => mountSvelte(ComboboxControlled, { onValueChange: onSvelte }),
      [clickInput, option('Bergen'), type('Be'), add, pressOutside],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls.at(-1)).toEqual([['4601']]);
    expect(input(svelte.root).value).toBe('Be');
    expect(svelte.output()).toBe(null);
    await svelte.destroy();
  });

  test('value, not followed: a selection calls onValueChange and shows; value comes back when the options change', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactControlled value={['0301']} onValueChange={onReact} />),
      () => mountSvelte(ComboboxControlled, { value: ['0301'], onValueChange: onSvelte }),
      [clickInput, option('Bergen'), add, pressOutside],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    // In React too, the text set back to Oslo then selects Oslo, as typing it would.
    expect(onSvelte.mock.calls).toContainEqual([['4601']]);
    expect(onSvelte.mock.calls.at(-1)).toEqual([['0301']]);
    expect(input(svelte.root).value).toBe('Oslo');
    expect(svelte.output()).toEqual(['0301']);
    await svelte.destroy();
  });

  test('value, multiple, not followed: as React', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactControlled multiple value={['0301']} onValueChange={onReact} />),
      () => mountSvelte(ComboboxControlled, { multiple: true, value: ['0301'], onValueChange: onSvelte }),
      [clickInput, option('Bergen'), chip('Oslo'), add, pressOutside],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(svelte.output()).toEqual(['0301']);
    await svelte.destroy();
  });

  test('value, with a parent that follows onValueChange: it changes', async () => {
    const svelte = await steps(
      () => mountReact(<ReactControlled value={['0301']} follow />),
      () => mountSvelte(ComboboxControlled, { value: ['0301'], follow: true }),
      [clickInput, option('Bergen'), add, pressOutside],
    );
    expect(svelte.output()).toEqual(['4601']);
    expect(input(svelte.root).value).toBe('Bergen');
    await svelte.destroy();
  });

  test('bind:value: changes, and updates the bound value (as React with a parent that follows)', async () => {
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactControlled value={['0301']} follow />),
      () => mountSvelte(ComboboxControlled, { value: ['0301'], bind: true, onValueChange: onSvelte }),
      [clickInput, option('Bergen'), add, pressOutside],
    );
    expect(svelte.output()).toEqual(['4601']);
    expect(onSvelte.mock.calls.at(-1)).toEqual([['4601']]);
    await svelte.destroy();
  });

  test('an option added between others goes there: in the list and for the arrow keys', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactControlled onValueChange={onReact} />),
      () => mountSvelte(ComboboxControlled, { onValueChange: onSvelte }),
      [add, clickInput, key('ArrowDown'), key('Enter')],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls.at(-1)).toEqual([['3405']]);
    await svelte.destroy();
  });

  test('a child that is not an option renders once, in the open list, before the options', async () => {
    const svelte = await steps(
      () => mountReact(<ReactControlled extra />),
      () => mountSvelte(ComboboxControlled, { extra: true }),
      [clickInput, type('B'), pressOutside],
    );
    expect(document.body.textContent!.split('Ekstra').length).toBe(1);
    await svelte.destroy();
  });

  test('setting the text from code calls oninput, as React calls onChange', async () => {
    // The text, and the type of the native event: `change` when the Combobox sets the text. (Typing gives React's
    // onChange a synthetic event of type `change` and Svelte's oninput the native `input`.)
    const event = (e: { type: string; nativeEvent?: Event; target: EventTarget | null }) => [(e.nativeEvent ?? e).type, (e.target as HTMLInputElement).value];
    const onReact = vi.fn(event);
    const onSvelte = vi.fn(event);
    const svelte = await steps(
      () => mountReact(<ReactControlled value={['0301']} follow onChange={onReact} />),
      () => mountSvelte(ComboboxControlled, { value: ['0301'], follow: true, oninput: onSvelte }),
      [clickInput, option('Bergen'), type('Bodø'), pressOutside],
    );
    expect(onSvelte.mock.results).toEqual(onReact.mock.results);
    expect(onSvelte.mock.results.map((r) => r.value)).toContainEqual(['change', 'Bergen']);
    await svelte.destroy();
  });
});
