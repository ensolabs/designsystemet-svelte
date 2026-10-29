// The ported hooks, utilities and RovingFocus, used as in React: the same steps on Digdir's React and on the port,
// comparing the DOM after each step (and what canonical() leaves out: indeterminate, focus, callbacks).
import {
  Button,
  Checkbox,
  Fieldset,
  Radio,
  RovingFocusItem,
  RovingFocusRoot,
  ValidationMessage,
  omit as reactOmit,
  useCheckboxGroup as useReactCheckboxGroup,
  useIsomorphicLayoutEffect as useReactLayoutEffect,
  useRadioGroup as useReactRadioGroup,
  type UseCheckboxGroupProps,
  type UseRadioGroupProps,
} from '@digdir/designsystemet-react';
import { act, useRef, useState } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { omit } from '../src';
import { click, mountReact, mountStory, mountSvelte, settle, steps, type Mounted } from './interaction';
import { cases } from './storybook/cases';
import CheckboxGroup from './stories/hooks/CheckboxGroup.svelte';
import LayoutEffect from './stories/hooks/LayoutEffect.svelte';
import RadioGroup from './stories/hooks/RadioGroup.svelte';
import RovingFocus from './stories/hooks/RovingFocus.svelte';

/** An upstream story and its twin, mounted for steps(). */
const story = (file: string, name: string): [() => Promise<Mounted>, () => Promise<Mounted>] => {
  const c = cases.find((c) => c.file === file && c.name === name)!;
  return [() => mountReact(c.react()), () => mountStory(c.svelte!)];
};

const byLabel = (label: string) => (root: HTMLElement) =>
  click(root.querySelector(`input[aria-label="${label}"]`) ?? [...root.querySelectorAll('label')].find((l) => l.textContent === label)!);
const byText = (text: string) => (root: HTMLElement) => click([...root.querySelectorAll('button')].find((b) => b.textContent?.trim() === text)!);

/** The checked and indeterminate state of every checkbox, which the markup doesn't show. */
const checkState = (root: HTMLElement) =>
  [...root.querySelectorAll<HTMLInputElement>('input[type=checkbox]')].map((input) => `${input.value}:${input.checked ? 'on' : 'off'}${input.indeterminate ? '?' : ''}`).join(' ');

/** steps(), also comparing checkState after every step; returns the Svelte side and its states. */
async function stepsWithState(react: () => Promise<Mounted>, svelte: () => Promise<Mounted>, actions: ((root: HTMLElement) => void)[]) {
  const states: string[] = [];
  const withState = (mount: () => Promise<Mounted>, record: boolean) => async () => {
    const mounted = await mount();
    const markup = mounted.markup;
    return {
      ...mounted,
      markup: () => {
        const state = checkState(mounted.root);
        if (record) states.push(state);
        return `${markup()}\n${state}`;
      },
    };
  };
  const svelteSide = await steps(withState(react, false), withState(svelte, true), actions);
  return { svelte: svelteSide, states };
}

describe('useCheckboxGroup', () => {
  test('AllowIndeterminate: "select all" follows the rows, and checks or clears them', async () => {
    const { svelte, states } = await stepsWithState(...story('use-checkbox-group', 'AllowIndeterminate'), [
      byLabel('Check 1'),
      byLabel('Check 2'),
      byLabel('Select all'),
      byLabel('Select all'),
      byLabel('Check 2'),
    ]);
    expect(states).toEqual(['all:off 1:off 2:off', 'all:off? 1:on 2:off', 'all:on 1:on 2:on', 'all:off 1:off 2:off', 'all:on 1:on 2:on', 'all:off? 1:on 2:off']);
    await svelte.destroy();
  });

  test('InTableWithPagination: the selection stays across pages', async () => {
    const { svelte } = await stepsWithState(...story('checkbox', 'InTableWithPagination'), [
      byLabel('Select all'),
      byText('Neste'),
      byLabel('Check 4'),
      byText('Forrige'),
      byLabel('Check 2'),
    ]);
    await svelte.destroy();
  });

  test('Controlled: setValue from the chips and the clear button', async () => {
    const svelte = await steps(...story('checkbox', 'Controlled'), [
      byLabel('Grunnskole'),
      (root) => click(root.querySelector('[aria-label="Slett Barnehage"]')!),
      byText('Tøm filtre'),
      byLabel('Videregående'),
    ]);
    await svelte.destroy();
  });

  test('Conditional: the value outlives the fieldset', async () => {
    const svelte = await steps(...story('checkbox', 'Conditional'), [byText('Rediger'), byLabel('SMS'), byText('Lagre'), byText('Rediger')]);
    await svelte.destroy();
  });

  function ReactGroup({ options }: { options: UseCheckboxGroupProps }) {
    const group = useReactCheckboxGroup(options);
    return (
      <>
        <Fieldset>
          <Fieldset.Legend>Kanaler</Fieldset.Legend>
          <Checkbox aria-label="Alle" {...group.getCheckboxProps({ value: 'all', allowIndeterminate: true })} />
          <Checkbox label="E-post" {...group.getCheckboxProps('epost')} />
          <Checkbox label="Telefon" {...group.getCheckboxProps({ value: 'telefon', 'aria-describedby': 'hint' })} />
          <Checkbox label="SMS" {...group.getCheckboxProps('sms')} />
          <ValidationMessage {...group.validationMessageProps} />
        </Fieldset>
        <Button className="set" onClick={() => group.setValue(['sms'])}>
          SMS
        </Button>
      </>
    );
  }

  test('the options, onChange and setValue', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const options = { value: ['epost'], error: 'Velg minst to', required: true, variant: 'outline' } as const;
    const { svelte } = await stepsWithState(
      () => mountReact(<ReactGroup options={{ ...options, value: [...options.value], onChange: onReact }} />),
      () => mountSvelte(CheckboxGroup, { options: { ...options, value: [...options.value], onChange: onSvelte } }),
      [byLabel('Telefon'), byLabel('E-post'), byText('SMS'), byLabel('Alle')],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls[0]).toEqual([['epost', 'telefon'], ['epost']]);
    // "Alle" checks the others one by one, and each change reports the value from before the click, as in React.
    expect(onSvelte.mock.calls.slice(2)).toEqual([
      [['epost', 'sms'], ['sms']],
      [['epost', 'telefon', 'sms'], ['sms']],
      [['epost', 'telefon', 'sms'], ['sms']],
    ]);
    expect(svelte.output()).toEqual(['epost', 'telefon', 'sms']);
    await svelte.destroy();
  });

  test('disabled, readonly, name', async () => {
    const svelte = await steps(
      () => mountReact(<ReactGroup options={{ name: 'kanaler', disabled: true, readOnly: true }} />),
      () => mountSvelte(CheckboxGroup, { options: { name: 'kanaler', disabled: true, readonly: true } }),
      [byLabel('Telefon')],
    );
    await svelte.destroy();
  });
});

describe('useRadioGroup', () => {
  test('Controlled: the radios and setValue', async () => {
    const svelte = await steps(...story('use-radio-group', 'Controlled'), [
      byLabel('Flammen'),
      byText('Velg Snadder'),
      byLabel('Bare ost'),
      byText('Velg Flammen'),
    ]);
    await svelte.destroy();
  });

  test('Conditional: the value outlives the fieldset, and the radios come back checked', async () => {
    const svelte = await steps(...story('use-radio-group', 'Conditional'), [byText('Rediger'), byLabel('SMS'), byText('Lagre'), byText('Rediger')]);
    await svelte.destroy();
  });

  function ReactGroup({ options }: { options: UseRadioGroupProps }) {
    const group = useReactRadioGroup(options);
    return (
      <>
        <Fieldset>
          <Fieldset.Legend>Kanal</Fieldset.Legend>
          <Radio label="E-post" {...group.getRadioProps('epost')} />
          <Radio label="Telefon" {...group.getRadioProps({ value: 'telefon', 'aria-describedby': 'hint' })} />
          <Radio label="SMS" {...group.getRadioProps('sms')} />
          <ValidationMessage {...group.validationMessageProps} />
        </Fieldset>
        <Button className="set" onClick={() => group.setValue('sms')}>
          SMS
        </Button>
      </>
    );
  }

  test('the options, onChange and setValue', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const options = { value: 'epost', error: 'Velg en', required: true, variant: 'outline', name: 'kanal' } as const;
    const svelte = await steps(
      () => mountReact(<ReactGroup options={{ ...options, onChange: onReact }} />),
      () => mountSvelte(RadioGroup, { options: { ...options, onChange: onSvelte } }),
      [byLabel('Telefon'), byText('SMS'), byLabel('E-post')],
    );
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls).toEqual([
      ['telefon', 'epost'],
      ['epost', 'sms'],
    ]);
    expect(svelte.output()).toBe('epost');
    await svelte.destroy();
  });

  test('disabled and readonly', async () => {
    const svelte = await steps(
      () => mountReact(<ReactGroup options={{ disabled: true, readOnly: true }} />),
      () => mountSvelte(RadioGroup, { options: { disabled: true, readonly: true } }),
      [byLabel('Telefon')],
    );
    await svelte.destroy();
  });
});

describe('usePagination', () => {
  for (const [file, name] of [
    ['use-pagination', 'Preview'],
    ['pagination', 'WithAnchor'],
  ]) {
    test(`${file} ${name}: follows the current page`, async () => {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {});
      const page = (n: number) => (root: HTMLElement) => click(root.querySelector(`[aria-label="Side ${n}"]`)!);
      const svelte = await steps(...story(file, name), [
        page(5),
        (root) => click(root.querySelector('[aria-label="Neste side"]')!),
        page(10),
        (root) => click(root.querySelector('[aria-label="Neste side"]')!),
        page(1),
        (root) => click(root.querySelector('[aria-label="Forrige side"]')!),
      ]);
      await svelte.destroy();
      log.mockRestore();
    });
  }
});

describe('useDebounceCallback', () => {
  test('Default: the value shows once the typing has stopped for a second', async () => {
    const typeText = (text: string) => (root: HTMLElement) => {
      const input = root.querySelector('input')!;
      // Through the prototype's setter, as a browser does: React ignores a change made with its own tracked setter.
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, text);
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    };
    const wait = (ms: number) => () => new Promise((resolve) => setTimeout(resolve, ms));
    const [react, svelte] = story('use-debounce-callback', 'Default');
    const run = async (mounted: Mounted, wrap: (fn: () => Promise<unknown>) => Promise<unknown>) => {
      const seen: string[] = [];
      const paragraph = () => mounted.root.querySelector('p')!.textContent!.trim();
      for (const step of [typeText('a'), wait(300), typeText('ab'), wait(300), wait(900)]) {
        await wrap(async () => {
          const pending = step(mounted.root);
          await pending;
          await settle();
        });
        seen.push(paragraph());
      }
      await mounted.destroy();
      return seen;
    };
    const expected = await run(await react(), (fn) => act(fn));
    const received = await run(await svelte(), (fn) => fn());
    expect(received).toEqual(expected);
    expect(received).toEqual(['Debounced value:', 'Debounced value:', 'Debounced value:', 'Debounced value:', 'Debounced value: ab']);
  });
});

describe('useMediaQuery', () => {
  const original = window.matchMedia;
  afterEach(() => {
    window.matchMedia = original;
  });

  test('TestMediaQuery: follows the media query', async () => {
    let matches = true;
    const listeners = new Set<() => void>();
    window.matchMedia = (media: string) =>
      ({
        get matches() {
          return matches;
        },
        media,
        addEventListener: (_: string, listener: () => void) => listeners.add(listener),
        removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
      }) as unknown as MediaQueryList;
    const change = (to: boolean) => () => {
      matches = to;
      for (const listener of [...listeners]) listener();
    };
    const svelte = await steps(...story('use-media-query', 'TestMediaQuery'), [change(false), change(true)]);
    expect(svelte.root.textContent).toContain('Ja');
    await svelte.destroy();
    expect(listeners.size).toBe(0);
  });
});

describe('useSynchronizedAnimation', () => {
  const original = document.getAnimations;
  afterEach(() => {
    document.getAnimations = original;
  });

  test('TestSync: a new box joins the running animation', async () => {
    // A stand-in for the browser's animations: one per box, each starting at 100ms.
    const animations = new Map<Element, { animationName: string; currentTime: number; effect: { target: Element } }>();
    document.getAnimations = () => {
      for (const box of document.querySelectorAll('[style*="spin"]')) {
        if (!animations.has(box)) animations.set(box, { animationName: 'spin', currentTime: 100, effect: { target: box } });
      }
      return [...animations.values()] as unknown as Animation[];
    };
    const times = () => [...animations.values()].map((animation) => animation.currentTime);
    const [react, svelte] = story('use-synchronized-animation', 'TestSync');
    const results: number[][] = [];
    for (const [mount, wrap] of [
      [react, (fn: () => Promise<void>) => act(fn)],
      [svelte, (fn: () => Promise<void>) => fn()],
    ] as const) {
      animations.clear();
      const mounted = await mount();
      // The first box was reset to 0 when it came; time passes.
      for (const animation of animations.values()) animation.currentTime = 700;
      await wrap(async () => {
        byText('Ny boks')(mounted.root);
        await settle();
      });
      await wrap(async () => {
        byText('Ny boks')(mounted.root);
        await settle();
      });
      results.push(times());
      await mounted.destroy();
    }
    expect(results[1]).toEqual(results[0]);
    expect(results[1]).toEqual([700, 700, 700]);
  });
});

describe('useIsomorphicLayoutEffect', () => {
  function ReactLayoutEffect() {
    const [count, setCount] = useState(0);
    const always = useRef<HTMLParagraphElement>(null);
    const once = useRef<HTMLParagraphElement>(null);
    const runsAlways = useRef(0);
    const runsOnce = useRef(0);
    useReactLayoutEffect(() => {
      if (always.current) always.current.textContent = `${++runsAlways.current}`;
    });
    useReactLayoutEffect(() => {
      if (once.current) once.current.textContent = `${++runsOnce.current}`;
    }, []);
    return (
      <>
        <p ref={always}></p>
        <p ref={once}></p>
        <Button onClick={() => setCount(count + 1)}>{count}</Button>
      </>
    );
  }

  test('runs after every change without deps, and once with deps that stay the same', async () => {
    const svelte = await steps(() => mountReact(<ReactLayoutEffect />), () => mountSvelte(LayoutEffect, {}), [byText('0'), byText('1')]);
    expect([...svelte.root.querySelectorAll('p')].map((p) => p.textContent)).toEqual(['3', '1']);
    await svelte.destroy();
  });
});

describe('RovingFocus', () => {
  const warn = vi.spyOn(console, 'warn');
  afterEach(() => warn.mockReset());

  const key = (key: string, shiftKey = false) => () =>
    document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true }));
  const focusRoot = (root: HTMLElement) => root.querySelector<HTMLElement>('.root')!.focus();

  const ReactRoving = ({ activeValue, orientation }: { activeValue?: string; orientation?: 'vertical' | 'horizontal' | 'ambiguous' }) => (
    <RovingFocusRoot activeValue={activeValue} orientation={orientation} aria-label="Valg" className="root">
      <RovingFocusItem value="a">A</RovingFocusItem>
      <RovingFocusItem value="b" className="b">
        B
      </RovingFocusItem>
      <RovingFocusItem>C</RovingFocusItem>
    </RovingFocusRoot>
  );

  for (const [orientation, next, prev] of [
    ['horizontal', 'ArrowRight', 'ArrowLeft'],
    ['vertical', 'ArrowDown', 'ArrowUp'],
    ['ambiguous', 'ArrowDown', 'ArrowLeft'],
  ] as const) {
    test(`${orientation}: arrows, Home and End move focus, and the focused item is the tab stop`, async () => {
      const focused: Record<string, string[]> = { react: [], svelte: [] };
      const track = (side: string) => (action: (root: HTMLElement) => void) => (root: HTMLElement) => {
        action(root);
        focused[side].push(document.activeElement?.textContent ?? '');
      };
      const actions = [focusRoot, key(next), key(next), key(next), key(prev), key('End'), key('Home'), key('Tab', true)];
      let side = 'react';
      const svelte = await steps(
        () => mountReact(<ReactRoving activeValue="b" orientation={orientation} />),
        async () => {
          side = 'svelte';
          return mountSvelte(RovingFocus, { activeValue: 'b', orientation });
        },
        actions.map((action) => (root: HTMLElement) => track(side)(action)(root)),
      );
      expect(focused.svelte).toEqual(focused.react);
      expect(focused.svelte).toEqual(['B', 'C', 'A', 'B', 'A', 'C', 'A', 'A']);
      await svelte.destroy();
    });
  }

  test('without activeValue, the root focuses the first item; RovingFocusRoot warns that it is deprecated', async () => {
    const svelte = await steps(() => mountReact(<ReactRoving />), () => mountSvelte(RovingFocus, {}), [focusRoot, key('ArrowRight')]);
    expect(document.activeElement?.textContent).toBe('B');
    expect(warn).toHaveBeenCalledWith('Designsystemet: RovingFocusRoot is deprecated.');
    await svelte.destroy();
  });
});

test('omit', () => {
  const object = { a: 1, b: 2, c: 3, d: 4, [Symbol.iterator]: 5 };
  expect(omit(['a', 'd'], object)).toEqual(reactOmit(['a', 'd'], object));
  expect(omit(['a', 'd'], object)).toEqual({ b: 2, c: 3 });
});
