# Designsystemet for Svelte

[Designsystemet](https://designsystemet.no), the Norwegian public sector's design system, as Svelte 5 components. A 1:1 port of [`@digdir/designsystemet-react@1.23.0`](https://www.npmjs.com/package/@digdir/designsystemet-react/v/1.23.0), in the same way as Christian Ekrem's [Elm port](https://github.com/ensolabs/designsystemet-elm): the same components, the same markup, the same CSS.

- This package renders the markup of the React components.
- [`@digdir/designsystemet-css`](https://www.npmjs.com/package/@digdir/designsystemet-css) and a theme style it.
- [`@digdir/designsystemet-web`](https://www.npmjs.com/package/@digdir/designsystemet-web) adds the behaviour (tabs, popovers, dialogs, field wiring, tooltips, suggestions) as web components and polyfills. Nothing is reimplemented here.

## Status

Not on npm yet. Until it is, install it from GitHub, pinned to a commit:

```sh
bun add github:ensolabs/designsystemet-svelte#<commit> @digdir/designsystemet-css@1.23.0
```

The package builds itself on install (`prepare`). The version follows the upstream version it mirrors: `1.23.0` is a port of `@digdir/designsystemet-react@1.23.0`.

## Setup

Load the CSS and a theme once, in the root layout:

```svelte
<script lang="ts">
  import '@digdir/designsystemet-css';
  import '@digdir/designsystemet-css/theme'; // or your own theme from theme.designsystemet.no
</script>
```

The components load `@digdir/designsystemet-web` themselves, at the version this port mirrors, as the React components do. It does nothing on a server. Don't install it yourself.

```svelte
<script lang="ts">
  import { Button, Textfield } from '@ensolabs/designsystemet-svelte';

  let name = $state('');
</script>

<form data-size="sm">
  <Textfield label="Navn" bind:value={name} />
  <Button type="submit">Lagre</Button>
  <Button variant="tertiary" data-color="danger">Slett</Button>
</form>
```

## From React to Svelte

The props are the React props, with these Svelte habits:

- `class` instead of `className`, and `style` as a string.
- Children and any other `ReactNode` prop are snippets. A prop that is usually text (`label`, `description`, `error`) takes a string or a snippet.
- Compound components work both ways, as in React: `<Tabs.List>` or `<TabsList>`.
- `asChild` becomes a `child` snippet. The component passes the attributes it would have set, and you spread them on your own element:

  ```svelte
  <Button variant="secondary">
    {#snippet child({ props })}<a href="/" {...props}>Til forsiden</a>{/snippet}
  </Button>
  ```

- Native attribute names, lower-case: `popovertarget`, `commandfor`, `readonly`, `onclick`.
- State that React controls with `value`/`onChange` or `open`/`onClose` is bindable: `bind:value`, `bind:checked`, `bind:group`, `bind:open`. Callbacks that React names `onX` keep the React name and get the same arguments, minus React's synthetic event.
- `ref` is bindable too: `bind:ref` gives the element React's `ref` points at.

Hooks have Svelte counterparts where Svelte needs them: `pagination()` for `usePagination`. `useCheckboxGroup` and `useRadioGroup` aren't ported; use `bind:group` and a Fieldset.

`Combobox` is deprecated upstream and not ported; use `Suggestion`.

## Where it differs from React

Each of these follows from a React idiom Svelte has no counterpart for. The markup is still React's.

- **`child` instead of `asChild`.** Your snippet renders the element, so the component can't put content into it. `Avatar` can't add the initials to your element; write them yourself. `Dialog` has no `child`, because React's `asChild` on Dialog always throws. `Chip.Checkbox` and `Chip.Radio` pass `{ props, input }`, and you render `{@render input()}` inside your element, where React uses Radix's `Slottable`. `Tooltip` passes its attributes to `child`, or wraps text children in `<span tabindex="0">` as React does with a string.
- **Bindable state instead of controlled props.** `Details` with `open` updates `open` when the user toggles it, where React locks it to the prop. A `Radio` takes either `checked` or `bind:group`, not both. `Suggestion` folds `defaultSelected` into a bindable `selected`.
- **Callbacks get values, not React's synthetic events.**
- **Suggestion filtering.** React re-filters its list on every render. This port re-filters on mount, when `filter` changes, and when the options change (a `MutationObserver`).
- **Upstream quirks are kept**, so the markup matches: for example, Breadcrumbs and Pagination items drop `class`, Popover.Trigger drops `id`, and Skeleton writes its unused `characters` prop as an attribute.

## How 1:1 is checked

- `test/exports.test.ts`: every export of `@digdir/designsystemet-react` (113 names and 61 compound parts) is exported here under the same name, apart from a listed few with the reason (Combobox, the React hooks).
- `test/*.test.tsx`: every story is mounted twice in jsdom, once with Digdir's React components and once with these, and the two DOMs must be equal after normalizing (attribute order, class order, and generated ids compared by which element they point at). Interaction tests cover what React implements itself: Suggestion, Dialog and Popover open state, Tabs, ToggleGroup, Search and `pagination()`.

Not yet checked: the stories are written for this port, not taken from Digdir's Storybook (the Elm port checks against every upstream story), and server rendering with hydration isn't compared. Both are planned.

## Porting rules

For anyone adding or upgrading a component:

1. **Read the React source**, not the docs: `node_modules/@digdir/designsystemet-react/dist/esm/components/<name>/*.js` and its `.d.ts`. Port every prop, default and attribute, in the same element structure.
2. **Same markup.** Same elements, classes, `data-*` and `aria-*` attributes, with the same defaults. Leave out an attribute exactly when React leaves it out (React drops `undefined`, `null` and `false` for `data-*`; check each case).
3. **No styles and no behaviour of our own.** If React leaves something to `designsystemet-web`, so do we. If React does something itself (an effect, a handler, a context), port that with runes, `setContext`/`getContext` and `{@attach}`.
4. **Icons**: where React renders an `@navikt/aksel-icons` component, inline the same SVG markup.
5. **One component per file**, `src/<name>/<Name>.svelte`, with `src/<name>/index.ts` for compound components (`Object.assign(Root, { Part })`) and their flat exports.
6. **A parity story for every upstream feature**: `test/stories/<group>.svelte` exports a snippet per story, and `test/<group>.test.tsx` has its React twin under the same name. The test mounts both in jsdom and compares the DOM, with ids compared by what they point at.

## Develop

```sh
bun install
bun run typecheck   # svelte-check
bun run test        # parity with @digdir/designsystemet-react, and interaction tests
bun run build       # svelte-package → dist/
```

To upgrade, bump every `@digdir/*` version and `version` together, run the tests, and port what upstream changed.

## License

MIT. Based on [Designsystemet](https://github.com/digdir/designsystemet), © Digitaliseringsdirektoratet (Digdir), MIT. See [AI_DISCLOSURE.md](AI_DISCLOSURE.md) for how this port was written.
