<!-- Svelte twins of the stories in choices.test.tsx: the same name, the same markup. -->
<script module lang="ts">
  import Alert from '../../src/alert/Alert.svelte';
  import { Badge, BadgePosition } from '../../src/badge';
  import { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable } from '../../src/chip';
  import Checkbox from '../../src/checkbox/Checkbox.svelte';
  import { Fieldset, FieldsetDescription, FieldsetLegend } from '../../src/fieldset';
  import Radio from '../../src/radio/Radio.svelte';
  import { Select, SelectOptgroup, SelectOption } from '../../src/select';
  import Switch from '../../src/switch/Switch.svelte';
  import Tag from '../../src/tag/Tag.svelte';
  import { ToggleGroup, ToggleGroupItem } from '../../src/toggle-group';

  export {
    alert,
    alertColors,
    badge,
    badgeCounts,
    badgePosition,
    tag,
    tagAsChild,
    checkbox,
    checkboxFull,
    checkboxAriaLabel,
    checkboxSnippets,
    radio,
    radioFull,
    switchDefault,
    switchFull,
    fieldset,
    fieldsetFlat,
    fieldsetDescriptionAsChild,
    select,
    selectFull,
    selectAriaReadonly,
    selectOptionAsChild,
    chipButton,
    chipButtonAsChild,
    chipRemovable,
    chipCheckbox,
    chipRadio,
    chipCheckboxAsChild,
    toggleGroup,
    toggleGroupFull,
    toggleGroupLabels,
    interactiveToggleGroup,
    interactiveBindings,
  };

  /** State the interactive stories bind to, for the interaction tests. */
  export const state = $state({
    view: 'liste' as string | undefined,
    changes: [] as string[],
    uncontrolled: [] as string[],
    checked: false as boolean | undefined,
    on: false as boolean | undefined,
    group: [] as string[],
    radio: undefined as string | undefined,
    city: '2' as string | undefined,
    chips: [] as string[],
    removed: 0,
  });
</script>

{#snippet alert()}<Alert>Dette er en informasjonsmelding</Alert>{/snippet}

{#snippet alertColors()}
  <Alert data-color="danger" data-size="sm" class="extra" role="alert" id="a1">Noe gikk galt</Alert>
  <Alert data-color="success" style="margin: 0">Lagret</Alert>
{/snippet}

{#snippet badge()}<Badge />{/snippet}

{#snippet badgeCounts()}
  <Badge count={5} />
  <Badge count={5} maxCount={10} />
  <Badge count={15} maxCount={10} variant="tinted" data-color="danger" />
  <Badge count={0} maxCount={10} variant="base" class="extra" />
  <Badge maxCount={10} />
{/snippet}

{#snippet badgePosition()}
  <Badge.Position><Badge count={3} /><span>Innboks</span></Badge.Position>
  <BadgePosition placement="bottom-left" overlap="circle" class="extra"><Badge /></BadgePosition>
{/snippet}

{#snippet tag()}
  <Tag>Melk</Tag>
  <Tag variant="outline" data-color="success" data-size="sm" class="extra">Ost</Tag>
{/snippet}

{#snippet tagAsChild()}
  <Tag variant="default">
    {#snippet child({ props })}<a href="/" {...props}>Lenke</a>{/snippet}
  </Tag>
{/snippet}

{#snippet checkbox()}<Checkbox label="Jeg godtar" value="ja" />{/snippet}

{#snippet checkboxFull()}
  <Checkbox
    label="Varsle meg"
    description="På e-post"
    error="Du må velge"
    variant="outline"
    position="end"
    data-size="sm"
    data-color="accent"
    class="extra"
    style="max-width: 20rem"
    name="varsel"
    value="epost"
    checked
    disabled
  />
  <Checkbox label="Låst" readonly checked />
{/snippet}

{#snippet checkboxAriaLabel()}<Checkbox aria-label="Velg rad" />{/snippet}

{#snippet labelSnippet()}<strong>Fet</strong> etikett{/snippet}
{#snippet descriptionSnippet()}<em>Hjelp</em>{/snippet}

{#snippet checkboxSnippets()}<Checkbox label={labelSnippet} description={descriptionSnippet} error={descriptionSnippet} />{/snippet}

{#snippet radio()}<Radio label="Ja" name="svar" value="ja" />{/snippet}

{#snippet radioFull()}
  <Radio
    label="Nei"
    description="Ikke nå"
    error="Velg ett svar"
    variant="outline"
    position="end"
    data-size="lg"
    class="extra"
    style="color: red"
    name="svar"
    value="nei"
    checked
    readonly
  />
  <Radio aria-label="Kanskje" name="svar" value="kanskje" />
{/snippet}

{#snippet switchDefault()}<Switch label="Mørk modus" />{/snippet}

{#snippet switchFull()}
  <Switch
    label="Varsler"
    description="Send varsler"
    position="end"
    variant="outline"
    data-size="sm"
    data-color="neutral"
    class="extra"
    style="margin: 0"
    checked
    readonly
    name="v"
    value="på"
  />
  <Switch aria-label="Av/på" disabled />
{/snippet}

{#snippet fieldset()}
  <Fieldset data-size="sm" class="extra" disabled>
    <Fieldset.Legend class="legend" data-size="lg">Hvor bor du?</Fieldset.Legend>
    <Fieldset.Description variant="short" data-size="sm">Velg ett sted</Fieldset.Description>
    <Radio label="Oslo" name="sted" value="oslo" />
    <Radio label="Bergen" name="sted" value="bergen" />
  </Fieldset>
{/snippet}

{#snippet fieldsetFlat()}
  <Fieldset>
    <FieldsetLegend>Legende</FieldsetLegend>
    <FieldsetDescription class="d">Beskrivelse</FieldsetDescription>
  </Fieldset>
{/snippet}

{#snippet fieldsetDescriptionAsChild()}
  <Fieldset.Description variant="long">
    {#snippet child({ props })}<div {...props}>Som div</div>{/snippet}
  </Fieldset.Description>
{/snippet}

{#snippet select()}
  <Select aria-label="Velg">
    <Select.Option value="1">En</Select.Option>
    <Select.Option value="2">To</Select.Option>
  </Select>
{/snippet}

{#snippet selectFull()}
  <Select width="auto" readonly data-size="sm" class="extra" name="by" value="b" required>
    <SelectOption value="" disabled>Velg by</SelectOption>
    <Select.Optgroup label="Vest">
      <Select.Option value="b">Bergen</Select.Option>
      <SelectOption value="s">Stavanger</SelectOption>
    </Select.Optgroup>
    <SelectOptgroup label="Øst" disabled>
      <SelectOption value="o">Oslo</SelectOption>
    </SelectOptgroup>
  </Select>
  <Select readonly={false} width="full"><SelectOption>Tom</SelectOption></Select>
{/snippet}

{#snippet selectAriaReadonly()}
  <Select aria-readonly="false" readonly><SelectOption value="x">X</SelectOption></Select>
  <Select aria-readonly={true}><SelectOption value="y">Y</SelectOption></Select>
{/snippet}

{#snippet selectOptionAsChild()}
  <Select>
    <SelectOption value="a">
      {#snippet child({ props })}<option {...props}>A</option>{/snippet}
    </SelectOption>
    <SelectOptgroup label="G">
      {#snippet child({ props })}<optgroup {...props}><option>B</option></optgroup>{/snippet}
    </SelectOptgroup>
  </Select>
{/snippet}

{#snippet chipButton()}
  <Chip.Button>Klikk</Chip.Button>
  <ChipButton type="submit" data-color="accent" data-size="sm" data-wrap="nowrap" class="extra" disabled>Send</ChipButton>
{/snippet}

{#snippet chipButtonAsChild()}
  <Chip.Button>
    {#snippet child({ props })}<a href="/" {...props}>Lenke</a>{/snippet}
  </Chip.Button>
{/snippet}

{#snippet chipRemovable()}
  <Chip.Removable aria-label="Slett Nynorsk">Nynorsk</Chip.Removable>
  <ChipRemovable data-color="danger" class="extra">Bokmål</ChipRemovable>
{/snippet}

{#snippet chipCheckbox()}
  <Chip.Checkbox name="sprak" value="nn">Nynorsk</Chip.Checkbox>
  <ChipCheckbox name="sprak" value="nb" checked data-color="accent" data-size="sm" data-wrap="wrap" class="extra" disabled readonly>Bokmål</ChipCheckbox>
{/snippet}

{#snippet chipRadio()}
  <Chip.Radio name="r" value="nn" checked>Nynorsk</Chip.Radio>
  <ChipRadio name="r" value="nb" data-size="lg">Bokmål</ChipRadio>
{/snippet}

{#snippet chipCheckboxAsChild()}
  <Chip.Checkbox value="x" data-color="neutral">
    {#snippet child({ props, input })}<span {...props}>{@render input()}Valg</span>{/snippet}
  </Chip.Checkbox>
{/snippet}

{#snippet toggleGroup()}
  <ToggleGroup aria-label="Visning" name="visning" defaultValue="liste">
    <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
    <ToggleGroup.Item value="rutenett">Rutenett</ToggleGroup.Item>
  </ToggleGroup>
{/snippet}

{#snippet toggleGroupFull()}
  <ToggleGroup data-toggle-group="Sortering" name="sort" value="b" variant="secondary" data-size="sm" class="extra" style="margin: 0">
    <ToggleGroupItem value="a" disabled class="first" data-color="neutral">A</ToggleGroupItem>
    <ToggleGroupItem value="b" aria-disabled="true" icon title="B"><svg></svg></ToggleGroupItem>
    <ToggleGroupItem
      value="c"
      readonly
      required
      form="f"
      formaction="/x"
      formenctype="text/plain"
      formmethod="post"
      formnovalidate
      formtarget="_blank"
      id="c1">C</ToggleGroupItem
    >
  </ToggleGroup>
{/snippet}

{#snippet toggleGroupLabels()}
  <ToggleGroup aria-labelledby="h1" name="n1"><ToggleGroupItem value="x">X</ToggleGroupItem></ToggleGroup>
  <h2 id="h1">Overskrift</h2>
  <ToggleGroup variant="primary" name="n2"><ToggleGroupItem value="y" aria-disabled="false">Y</ToggleGroupItem></ToggleGroup>
{/snippet}

{#snippet interactiveToggleGroup()}
  <ToggleGroup aria-label="Ukontrollert" defaultValue="a" onChange={(v) => state.uncontrolled.push(v)}>
    <ToggleGroupItem value="a">A</ToggleGroupItem>
    <ToggleGroupItem value="b">B</ToggleGroupItem>
    <ToggleGroupItem>Uten verdi</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup aria-label="Bundet" name="bundet" bind:value={state.view} onChange={(v) => state.changes.push(v)}>
    <ToggleGroupItem value="liste">Liste</ToggleGroupItem>
    <ToggleGroupItem value="rutenett">Rutenett</ToggleGroupItem>
  </ToggleGroup>
{/snippet}

{#snippet interactiveBindings()}
  <Checkbox label="Enkel" bind:checked={state.checked} />
  <Switch label="Bryter" bind:checked={state.on} />
  <Checkbox label="E" value="e" bind:group={state.group} />
  <Checkbox label="F" value="f" bind:group={state.group} />
  <Radio label="R1" name="r" value="r1" bind:group={state.radio} />
  <Radio label="R2" name="r" value="r2" bind:group={state.radio} />
  <Select aria-label="By" bind:value={state.city}>
    <Select.Option value="1">En</Select.Option>
    <Select.Option value="2">To</Select.Option>
  </Select>
  <Chip.Checkbox value="c1" bind:group={state.chips}>C1</Chip.Checkbox>
  <Chip.Radio name="cr" value="cr1">CR1</Chip.Radio>
  <Chip.Removable onclick={() => state.removed++}>Fjern</Chip.Removable>
{/snippet}
