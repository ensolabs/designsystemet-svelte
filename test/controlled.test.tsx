// Controlled state where Digdir's React components implement it themselves, as in details.test.tsx: uncontrolled,
// controlled by a prop (the component reports the change and stays at the parent's value unless the parent changes
// it), controlled with a parent that follows the callback, and Svelte's bind:.
import { Dialog, EXPERIMENTAL_Suggestion as Suggestion, Popover, ToggleGroup } from '@digdir/designsystemet-react';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { click, mountReact, mountSvelte, steps } from './interaction';
import DialogOpen from './stories/controlled/DialogOpen.svelte';
import PopoverOpen from './stories/controlled/PopoverOpen.svelte';
import SuggestionSelected from './stories/controlled/SuggestionSelected.svelte';
import ToggleGroupValue from './stories/controlled/ToggleGroupValue.svelte';

describe('ToggleGroup', () => {
  const choose = (value: string) => (root: HTMLElement) => click(root.querySelector(`input[value="${value}"]`)!);
  const checked = (root: HTMLElement) => root.querySelector<HTMLInputElement>('input:checked')?.value ?? null;

  const ReactGroup = (props: { value?: string; defaultValue?: string; onChange?: (value: string) => void }) => (
    <ToggleGroup aria-label="Visning" name="visning" {...props}>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup>
  );
  function Following({ initial }: { initial: string }) {
    const [value, setValue] = useState(initial);
    return <ReactGroup value={value} onChange={setValue} />;
  }

  test('uncontrolled: the user chooses, from defaultValue', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactGroup defaultValue="a" onChange={onReact} />),
      () => mountSvelte(ToggleGroupValue, { defaultValue: 'a', onChange: onSvelte }),
      [choose('b'), choose('c')],
    );
    expect(checked(svelte.root)).toBe('c');
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls).toEqual([['b'], ['c']]);
    await svelte.destroy();
  });

  test('value: a choice calls onChange, and the group stays at value', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<ReactGroup value="a" onChange={onReact} />),
      () => mountSvelte(ToggleGroupValue, { value: 'a', onChange: onSvelte }),
      [choose('b'), choose('c')],
    );
    expect(checked(svelte.root)).toBe('a');
    expect(svelte.output()).toBe('a');
    expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
    expect(onSvelte.mock.calls).toEqual([['b'], ['c']]);
    await svelte.destroy();
  });

  test('value, with a parent that follows onChange: it changes', async () => {
    const svelte = await steps(
      () => mountReact(<Following initial="a" />),
      () => mountSvelte(ToggleGroupValue, { value: 'a', follow: true }),
      [choose('b'), choose('c')],
    );
    expect(checked(svelte.root)).toBe('c');
    expect(svelte.output()).toBe('c');
    await svelte.destroy();
  });

  test('bind:value: changes, and updates the bound value (as React with a parent that follows)', async () => {
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<Following initial="a" />),
      () => mountSvelte(ToggleGroupValue, { value: 'a', bind: true, onChange: onSvelte }),
      [choose('b'), choose('c')],
    );
    expect(svelte.output()).toBe('c');
    expect(onSvelte.mock.calls).toEqual([['b'], ['c']]);
    await svelte.destroy();
  });
});

describe('Dialog', () => {
  const escape = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  const button = (id: string) => (root: HTMLElement) => click(root.querySelector(`#${id}`)!);
  const trigger = (root: HTMLElement) => click(root.querySelector('[aria-haspopup="dialog"]')!);
  const isOpen = (root: HTMLElement) => root.querySelector('dialog')!.open;
  // What onClose gets: the native close event, on the dialog.
  const closeEvent = (event: Event) => [event.constructor.name, event.type, (event.target as Element).tagName];

  function ReactDialog({ initial, follow = false, onClose }: { initial?: boolean; follow?: boolean; onClose?: (event: Event) => void }) {
    const [open, setOpen] = useState(initial);
    const [modal, setModal] = useState(true);
    return (
      <>
        <button id="set-open" onClick={() => setOpen(true)}>Sett åpen</button>
        <button id="set-closed" onClick={() => setOpen(false)}>Sett lukket</button>
        <button id="toggle-modal" onClick={() => setModal(!modal)}>Modal</button>
        <Dialog.TriggerContext>
          <Dialog.Trigger>Åpne</Dialog.Trigger>
          <Dialog
            open={open}
            modal={modal}
            onClose={(event) => {
              onClose?.(event);
              if (follow) setOpen(false);
            }}
          >
            Innhold
          </Dialog>
        </Dialog.TriggerContext>
      </>
    );
  }

  test('uncontrolled: the trigger opens it, the user closes it, with onClose', async () => {
    const onReact = vi.fn(closeEvent);
    const onSvelte = vi.fn(closeEvent);
    const svelte = await steps(
      () => mountReact(<ReactDialog onClose={onReact} />),
      () => mountSvelte(DialogOpen, { onClose: onSvelte }),
      [trigger, escape, trigger],
    );
    expect(isOpen(svelte.root)).toBe(true);
    expect(onSvelte.mock.results).toEqual(onReact.mock.results);
    expect(onSvelte.mock.results.map((r) => r.value)).toEqual([['Event', 'close', 'DIALOG']]);
    await svelte.destroy();
  });

  test('open={true}: Escape closes it and calls onClose; open stays true, so setting it to false closes it after a reopen', async () => {
    const onReact = vi.fn(closeEvent);
    const onSvelte = vi.fn(closeEvent);
    const svelte = await steps(
      () => mountReact(<ReactDialog initial onClose={onReact} />),
      () => mountSvelte(DialogOpen, { open: true, onClose: onSvelte }),
      [escape, trigger, button('set-closed'), button('set-open')],
    );
    expect(isOpen(svelte.root)).toBe(true);
    expect(onSvelte.mock.results).toEqual(onReact.mock.results);
    expect(onSvelte).toHaveBeenCalledTimes(1);
    await svelte.destroy();
  });

  test('open={true}, closed by the user: a change of modal opens it again, as React reruns its effect', async () => {
    const svelte = await steps(
      () => mountReact(<ReactDialog initial />),
      () => mountSvelte(DialogOpen, { open: true }),
      [escape, button('toggle-modal')],
    );
    expect(isOpen(svelte.root)).toBe(true);
    await svelte.destroy();
  });

  test('open, with a parent that follows onClose: Escape closes it and the parent can open it again', async () => {
    const svelte = await steps(
      () => mountReact(<ReactDialog initial follow />),
      () => mountSvelte(DialogOpen, { open: true, follow: true }),
      [escape, button('set-open'), escape],
    );
    expect(isOpen(svelte.root)).toBe(false);
    expect(svelte.output()).toBe(false);
    await svelte.destroy();
  });

  test('bind:open: Escape closes it and updates the bound value (as React with a parent that follows)', async () => {
    const onSvelte = vi.fn(closeEvent);
    const svelte = await steps(
      () => mountReact(<ReactDialog initial follow />),
      () => mountSvelte(DialogOpen, { open: true, bind: true, onClose: onSvelte }),
      [escape, button('set-open'), escape],
    );
    expect(svelte.output()).toBe(false);
    expect(onSvelte).toHaveBeenCalledTimes(2);
    await svelte.destroy();
  });
});

describe('Popover', () => {
  const trigger = (root: HTMLElement) => click(root.querySelector('[popovertarget]')!);
  const outside = (root: HTMLElement) => click(root.querySelector('p')!);
  const isShown = (root: HTMLElement) => root.querySelector<HTMLElement>('[popover]')!.style.display === 'block';

  function ReactPopover(props: { initial?: boolean; follow?: boolean; onOpen?: () => void; onClose?: () => void }) {
    const [open, setOpen] = useState(props.initial);
    return (
      <>
        <Popover.TriggerContext>
          <Popover.Trigger>Åpne</Popover.Trigger>
          <Popover
            open={open}
            onOpen={() => {
              props.onOpen?.();
              if (props.follow) setOpen(true);
            }}
            onClose={() => {
              props.onClose?.();
              if (props.follow) setOpen(false);
            }}
          >
            Innhold
          </Popover>
        </Popover.TriggerContext>
        <p>Utenfor</p>
      </>
    );
  }

  const callbacks = () => {
    const log: string[] = [];
    return { log, onOpen: () => void log.push('open'), onClose: () => void log.push('close') };
  };

  test('uncontrolled: the trigger opens and closes it, a click outside closes it', async () => {
    const react = callbacks();
    const svelte = callbacks();
    const mounted = await steps(
      () => mountReact(<ReactPopover onOpen={react.onOpen} onClose={react.onClose} />),
      () => mountSvelte(PopoverOpen, { onOpen: svelte.onOpen, onClose: svelte.onClose }),
      [trigger, trigger, trigger, outside],
    );
    expect(isShown(mounted.root)).toBe(false);
    expect(svelte.log).toEqual(react.log);
    expect(svelte.log).toEqual(['open', 'close', 'open', 'close']);
    await mounted.destroy();
  });

  for (const open of [false, true]) {
    test(`open={${open}}: clicks call onOpen/onClose, and it stays as open says`, async () => {
      const react = callbacks();
      const svelte = callbacks();
      const mounted = await steps(
        () => mountReact(<ReactPopover initial={open} onOpen={react.onOpen} onClose={react.onClose} />),
        () => mountSvelte(PopoverOpen, { open, onOpen: svelte.onOpen, onClose: svelte.onClose }),
        [trigger, outside, trigger],
      );
      expect(isShown(mounted.root)).toBe(open);
      expect(mounted.output()).toBe(open);
      expect(svelte.log).toEqual(react.log);
      expect(svelte.log.length).toBeGreaterThan(0);
      await mounted.destroy();
    });
  }

  test('open, with a parent that follows onOpen and onClose: it opens and closes', async () => {
    const mounted = await steps(
      () => mountReact(<ReactPopover initial={false} follow />),
      () => mountSvelte(PopoverOpen, { open: false, follow: true }),
      [trigger, outside, trigger],
    );
    expect(isShown(mounted.root)).toBe(true);
    expect(mounted.output()).toBe(true);
    await mounted.destroy();
  });

  test('bind:open: opens and closes, and updates the bound value (as React with a parent that follows)', async () => {
    const svelte = callbacks();
    const mounted = await steps(
      () => mountReact(<ReactPopover initial={false} follow />),
      () => mountSvelte(PopoverOpen, { open: false, bind: true, onOpen: svelte.onOpen, onClose: svelte.onClose }),
      [trigger, outside, trigger],
    );
    expect(mounted.output()).toBe(true);
    expect(svelte.log).toEqual(['open', 'close', 'open']);
    await mounted.destroy();
  });
});

// Suggestion's `selected` not bound, bound and uncontrolled are tested against React in inputs.test.tsx; here, a parent
// that follows onSelectedChange.
describe('Suggestion', () => {
  const type = (text: string) => (root: HTMLElement) => {
    const input = root.querySelector('input')!;
    input.focus();
    input.value = text;
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
  };
  const enter = (root: HTMLElement) => root.querySelector('input')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  const clear = (root: HTMLElement) => click(root.querySelector('button[type=reset]')!);

  function ReactSuggestion({ initial, multiple = false, onSelectedChange }: { initial: any; multiple?: boolean; onSelectedChange: (value: any) => void }) {
    const [selected, setSelected] = useState(initial);
    return (
      <Suggestion
        multiple={multiple as false}
        selected={selected}
        onSelectedChange={(value: any) => {
          onSelectedChange(value);
          setSelected(value);
        }}
      >
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
  }

  for (const multiple of [false, true]) {
    test(`selected${multiple ? ' (multiple)' : ''}, with a parent that follows onSelectedChange: it changes`, async () => {
      const onReact = vi.fn();
      const onSvelte = vi.fn();
      const initial = multiple ? ['Oslo'] : 'Oslo';
      const svelte = await steps(
        () => mountReact(<ReactSuggestion initial={initial} multiple={multiple} onSelectedChange={onReact} />),
        () => mountSvelte(SuggestionSelected, { selected: initial, multiple, onSelectedChange: onSvelte }),
        [type('Bodø'), enter, type('Bergen'), enter, clear],
      );
      expect(onSvelte.mock.calls).toEqual(onReact.mock.calls);
      expect(onSvelte.mock.calls.length).toBeGreaterThanOrEqual(2);
      expect(svelte.output()).toEqual(onSvelte.mock.calls.at(-1)![0]);
      await svelte.destroy();
    });
  }
});
