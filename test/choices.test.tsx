import {
  Alert,
  Badge,
  BadgePosition,
  Checkbox,
  Chip,
  ChipButton,
  ChipCheckbox,
  ChipRadio,
  ChipRemovable,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Radio,
  Select,
  SelectOptgroup,
  SelectOption,
  Switch,
  Tag,
  ToggleGroup,
  ToggleGroupItem,
} from '@digdir/designsystemet-react';
import type { ReactElement } from 'react';
import { flushSync, mount, unmount, type Snippet } from 'svelte';
import { afterEach, expect, test } from 'vitest';
import Host from './Host.svelte';
import { both } from './parity';
import * as S from './stories/choices.svelte';

const stories: Record<Exclude<keyof typeof S, 'default' | 'state' | `interactive${string}`>, ReactElement> = {
  alert: <Alert>Dette er en informasjonsmelding</Alert>,
  alertColors: (
    <>
      <Alert data-color="danger" data-size="sm" className="extra" role="alert" id="a1">Noe gikk galt</Alert>
      <Alert data-color="success" style={{ margin: 0 }}>Lagret</Alert>
    </>
  ),
  badge: <Badge />,
  badgeCounts: (
    <>
      <Badge count={5} />
      <Badge count={5} maxCount={10} />
      <Badge count={15} maxCount={10} variant="tinted" data-color="danger" />
      <Badge count={0} maxCount={10} variant="base" className="extra" />
      <Badge maxCount={10} />
    </>
  ),
  badgePosition: (
    <>
      <Badge.Position><Badge count={3} /><span>Innboks</span></Badge.Position>
      <BadgePosition placement="bottom-left" overlap="circle" className="extra"><Badge /></BadgePosition>
    </>
  ),
  tag: (
    <>
      <Tag>Melk</Tag>
      <Tag variant="outline" data-color="success" data-size="sm" className="extra">Ost</Tag>
    </>
  ),
  tagAsChild: (
    <Tag variant="default" asChild>
      <a href="/">Lenke</a>
    </Tag>
  ),
  checkbox: <Checkbox label="Jeg godtar" value="ja" />,
  checkboxFull: (
    <>
      <Checkbox
        label="Varsle meg"
        description="På e-post"
        error="Du må velge"
        variant="outline"
        position="end"
        data-size="sm"
        data-color="accent"
        className="extra"
        style={{ maxWidth: '20rem' }}
        name="varsel"
        value="epost"
        defaultChecked
        disabled
      />
      <Checkbox label="Låst" readOnly defaultChecked />
    </>
  ),
  checkboxAriaLabel: <Checkbox aria-label="Velg rad" />,
  checkboxSnippets: (
    <Checkbox label={<><strong>Fet</strong> etikett</>} description={<em>Hjelp</em>} error={<em>Hjelp</em>} />
  ),
  radio: <Radio label="Ja" name="svar" value="ja" />,
  radioFull: (
    <>
      <Radio
        label="Nei"
        description="Ikke nå"
        error="Velg ett svar"
        variant="outline"
        position="end"
        data-size="lg"
        className="extra"
        style={{ color: 'red' }}
        name="svar"
        value="nei"
        defaultChecked
        readOnly
      />
      <Radio aria-label="Kanskje" name="svar" value="kanskje" />
    </>
  ),
  switchDefault: <Switch label="Mørk modus" />,
  switchFull: (
    <>
      <Switch
        label="Varsler"
        description="Send varsler"
        position="end"
        variant="outline"
        data-size="sm"
        data-color="neutral"
        className="extra"
        style={{ margin: 0 }}
        defaultChecked
        readOnly
        name="v"
        value="på"
      />
      <Switch aria-label="Av/på" disabled />
    </>
  ),
  fieldset: (
    <Fieldset data-size="sm" className="extra" disabled>
      <Fieldset.Legend className="legend" data-size="lg">Hvor bor du?</Fieldset.Legend>
      <Fieldset.Description variant="short" data-size="sm">Velg ett sted</Fieldset.Description>
      <Radio label="Oslo" name="sted" value="oslo" />
      <Radio label="Bergen" name="sted" value="bergen" />
    </Fieldset>
  ),
  fieldsetFlat: (
    <Fieldset>
      <FieldsetLegend>Legende</FieldsetLegend>
      <FieldsetDescription className="d">Beskrivelse</FieldsetDescription>
    </Fieldset>
  ),
  fieldsetDescriptionAsChild: (
    <Fieldset.Description variant="long" asChild>
      <div>Som div</div>
    </Fieldset.Description>
  ),
  select: (
    <Select aria-label="Velg">
      <Select.Option value="1">En</Select.Option>
      <Select.Option value="2">To</Select.Option>
    </Select>
  ),
  selectFull: (
    <>
      <Select width="auto" readOnly data-size="sm" className="extra" name="by" defaultValue="b" required>
        <SelectOption value="" disabled>Velg by</SelectOption>
        <Select.Optgroup label="Vest">
          <Select.Option value="b">Bergen</Select.Option>
          <SelectOption value="s">Stavanger</SelectOption>
        </Select.Optgroup>
        <SelectOptgroup label="Øst" disabled>
          <SelectOption value="o">Oslo</SelectOption>
        </SelectOptgroup>
      </Select>
      <Select readOnly={false} width="full"><SelectOption>Tom</SelectOption></Select>
    </>
  ),
  selectAriaReadonly: (
    <>
      <Select aria-readonly="false" readOnly><SelectOption value="x">X</SelectOption></Select>
      <Select aria-readonly={true}><SelectOption value="y">Y</SelectOption></Select>
    </>
  ),
  selectOptionAsChild: (
    <Select>
      <SelectOption value="a" asChild><option>A</option></SelectOption>
      <SelectOptgroup label="G" asChild><optgroup><option>B</option></optgroup></SelectOptgroup>
    </Select>
  ),
  chipButton: (
    <>
      <Chip.Button>Klikk</Chip.Button>
      <ChipButton type="submit" data-color="accent" data-size="sm" data-wrap="nowrap" className="extra" disabled>Send</ChipButton>
    </>
  ),
  chipButtonAsChild: (
    <Chip.Button asChild>
      <a href="/">Lenke</a>
    </Chip.Button>
  ),
  chipRemovable: (
    <>
      <Chip.Removable aria-label="Slett Nynorsk">Nynorsk</Chip.Removable>
      <ChipRemovable data-color="danger" className="extra">Bokmål</ChipRemovable>
    </>
  ),
  chipCheckbox: (
    <>
      <Chip.Checkbox name="sprak" value="nn">Nynorsk</Chip.Checkbox>
      <ChipCheckbox name="sprak" value="nb" defaultChecked data-color="accent" data-size="sm" data-wrap="wrap" className="extra" disabled readOnly>Bokmål</ChipCheckbox>
    </>
  ),
  chipRadio: (
    <>
      <Chip.Radio name="r" value="nn" defaultChecked>Nynorsk</Chip.Radio>
      <ChipRadio name="r" value="nb" data-size="lg">Bokmål</ChipRadio>
    </>
  ),
  chipCheckboxAsChild: (
    <Chip.Checkbox value="x" data-color="neutral" asChild>
      <span>Valg</span>
    </Chip.Checkbox>
  ),
  toggleGroup: (
    <ToggleGroup aria-label="Visning" name="visning" defaultValue="liste">
      <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
      <ToggleGroup.Item value="rutenett">Rutenett</ToggleGroup.Item>
    </ToggleGroup>
  ),
  toggleGroupFull: (
    <ToggleGroup data-toggle-group="Sortering" name="sort" value="b" variant="secondary" data-size="sm" className="extra" style={{ margin: 0 }}>
      <ToggleGroupItem value="a" disabled className="first" data-color="neutral">A</ToggleGroupItem>
      <ToggleGroupItem value="b" aria-disabled="true" icon title="B"><svg /></ToggleGroupItem>
      <ToggleGroupItem
        value="c"
        readOnly
        required
        form="f"
        formAction="/x"
        formEncType="text/plain"
        formMethod="post"
        formNoValidate
        formTarget="_blank"
        id="c1"
      >
        C
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  toggleGroupLabels: (
    <>
      <ToggleGroup aria-labelledby="h1" name="n1"><ToggleGroupItem value="x">X</ToggleGroupItem></ToggleGroup>
      <h2 id="h1">Overskrift</h2>
      <ToggleGroup variant="primary" name="n2"><ToggleGroupItem value="y" aria-disabled="false">Y</ToggleGroupItem></ToggleGroup>
    </>
  ),
};

for (const [name, react] of Object.entries(stories)) {
  test(name, async () => {
    const out = await both(react, (S as unknown as Record<string, Snippet>)[name]);
    expect(out.svelte).toBe(out.react);
  });
}

// Interaction: the Svelte components alone, with the behaviour React implements itself (ToggleGroup's selection and
// the bindings that stand in for React's value/onChange).

let cleanup: (() => void) | undefined;
afterEach(() => cleanup?.());

function mountStory(story: Snippet) {
  const container = document.body.appendChild(document.createElement('div'));
  const app = mount(Host, { target: container, props: { story } });
  flushSync();
  cleanup = () => {
    unmount(app);
    container.remove();
  };
  return container;
}

const click = (el: Element | null | undefined) => {
  (el as HTMLElement).click();
  flushSync();
};

test('ToggleGroup: uncontrolled, from defaultValue, with a generated name and value', () => {
  const root = mountStory(S.interactiveToggleGroup);
  const [first] = root.querySelectorAll('fieldset');
  const inputs = [...first.querySelectorAll('input')];
  expect(inputs.map((i) => i.checked)).toEqual([true, false, false]);
  expect(new Set(inputs.map((i) => i.name)).size).toBe(1);
  expect(inputs[0].name).toMatch(/^togglegroup-name-./);
  expect(inputs[2].value).not.toBe('');
  expect(inputs[2].value).not.toBe('on');

  click(inputs[1]);
  expect(inputs.map((i) => i.checked)).toEqual([false, true, false]);
  click(inputs[2]);
  expect(S.state.uncontrolled).toEqual(['b', inputs[2].value]);
});

test('ToggleGroup: bind:value both ways, onChange with the value', () => {
  const root = mountStory(S.interactiveToggleGroup);
  const inputs = [...root.querySelectorAll<HTMLInputElement>('input[name="bundet"]')];
  expect(inputs.map((i) => i.checked)).toEqual([true, false]);

  click(inputs[1]);
  expect(S.state.view).toBe('rutenett');
  expect(S.state.changes).toEqual(['rutenett']);

  S.state.view = 'liste';
  flushSync();
  expect(inputs.map((i) => i.checked)).toEqual([true, false]);
});

test('Checkbox and Switch: bind:checked', () => {
  const root = mountStory(S.interactiveBindings);
  const checkbox = root.querySelector<HTMLInputElement>('input[type="checkbox"]:not([role])')!;
  const toggle = root.querySelector<HTMLInputElement>('input[role="switch"]')!;
  click(checkbox);
  click(toggle);
  expect([S.state.checked, S.state.on]).toEqual([true, true]);
  S.state.on = false;
  flushSync();
  expect(toggle.checked).toBe(false);
});

test('Checkbox, Radio and Chip.Checkbox: bind:group', () => {
  const root = mountStory(S.interactiveBindings);
  click(root.querySelector('input[value="f"]'));
  click(root.querySelector('input[value="e"]'));
  expect([...S.state.group].sort()).toEqual(['e', 'f']);

  click(root.querySelector('input[value="r2"]'));
  expect(S.state.radio).toBe('r2');
  S.state.radio = 'r1';
  flushSync();
  expect(root.querySelector<HTMLInputElement>('input[value="r1"]')!.checked).toBe(true);

  click(root.querySelector('input[value="c1"]'));
  expect(S.state.chips).toEqual(['c1']);
});

test('Select: bind:value', () => {
  const root = mountStory(S.interactiveBindings);
  const select = root.querySelector('select')!;
  expect(select.value).toBe('2');
  select.value = '1';
  select.dispatchEvent(new Event('change', { bubbles: true }));
  flushSync();
  expect(S.state.city).toBe('1');
  S.state.city = '2';
  flushSync();
  expect(select.value).toBe('2');
});

test('Chip.Removable: a button that passes on clicks', () => {
  const root = mountStory(S.interactiveBindings);
  const button = root.querySelector('button[data-removable]')!;
  expect(button.getAttribute('type')).toBe('button');
  click(button);
  expect(S.state.removed).toBe(1);
});
