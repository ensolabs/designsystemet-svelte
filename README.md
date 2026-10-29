# Designsystemet for Svelte

[Designsystemet](https://designsystemet.no), the Norwegian public sector's design system, as Svelte 5 components. A 1:1 port of [`@digdir/designsystemet-react@1.23.0`](https://www.npmjs.com/package/@digdir/designsystemet-react/v/1.23.0), in the same way as Christian Ekrem's [Elm port](https://github.com/ensolabs/designsystemet-elm): the same components, the same markup, the same CSS.

- This package renders the markup of the React components.
- [`@digdir/designsystemet-css`](https://www.npmjs.com/package/@digdir/designsystemet-css) and a theme style it.
- [`@digdir/designsystemet-web`](https://www.npmjs.com/package/@digdir/designsystemet-web) adds the behaviour (tabs, popovers, dialogs, field wiring, tooltips, suggestions) as web components and polyfills. Nothing is reimplemented here.

## Status

Not on npm yet. Until it is, install the compiled package from the `dist` branch, pinned to a commit:

```sh
bun add github:ensolabs/designsystemet-svelte#<commit on dist> @digdir/designsystemet-css@1.23.0
```

CI builds `dist` from `main` after every check passes (`bun run package` writes the same folder that npm will get). Each `dist` commit says which `main` commit it was built from. The version follows the upstream version it mirrors: `1.23.0` is a port of `@digdir/designsystemet-react@1.23.0`.

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

Every React export is here under its React name, deprecated ones included (`Combobox`, `useMediaQuery`, `useDebounceCallback`, `RovingFocusRoot`, …). The hooks are Svelte functions that take the same arguments and return the same shape; call them while a component initializes, as with React hooks. A value React returns from a hook re-render is a getter here (`group.value`), and a hook that returns a plain value in React returns `{ current }` (`useMediaQuery`). `pagination()` and `synchronizedAnimation()` are kept as Svelte-style aliases.

## Where it differs from React

Each of these follows from a React idiom Svelte has no counterpart for. The markup is still React's.

- **`child` instead of `asChild`.** Your snippet renders the element, so the component can't put content into it. `Avatar` can't add the initials to your element; write them yourself. `Dialog` has no `child`, because React's `asChild` on Dialog always throws. `Chip.Checkbox` and `Chip.Radio` pass `{ props, input }`, and you render `{@render input()}` inside your element, where React uses Radix's `Slottable`. `Tooltip` passes its attributes to `child`, or wraps text children in `<span tabindex="0">` as React does with a string.
- **Controlled props, and `bind:` as Svelte's controlled form.** Where Digdir's React component implements controlled state itself (Details `open`, Tabs and ToggleGroup `value`, Dialog and Popover `open`, Suggestion `selected`, Combobox `value`), a prop that isn't bound behaves as React's controlled prop: the component calls the callback and stays at your value unless you change it. `bind:` updates your variable after the callback, as a React parent that follows the callback would. As in React, Dialog's `open` acts only when it changes: closed by the user while `open` stays `true`, the dialog stays closed until `open` changes. Native form controls (`Input`, `Checkbox`, `Radio`, `Switch`, `Select`, `Textfield`) keep Svelte's own semantics: React's rule that a controlled input stays at `value` is React's, not Digdir's. A `Radio` takes either `checked` or `bind:group`, not both. With `bind:selected`, Suggestion's items follow the binding, so clearing it shows no item, where React can show stale ones.
- **Combobox reads its options by rendering its children apart from the page** (on a detached element; on the server, to HTML that is dropped), as React reads its children's props. Other children show once, in the open list, but their scripts and effects also run in that hidden pass. A `value` entry with no matching option is skipped, where React throws a TypeError.
- **Callbacks get values, not React's synthetic events.**
- **`bind:indeterminate`** on a checkbox Input, where React needs a ref. It is the DOM property only, so the markup is React's.
- **`autofocus` on the server.** A string `autofocus` (`autofocus="true"`) is written as given in the browser, but svelte/server writes `autofocus` from a spread as `autofocus=""`.
- **Suggestion filtering.** React re-filters its list on every render; this port whenever a prop of Suggestion or its list changes, and when the options change. They differ only if a script sets the input's value without an input event and the parent then re-renders without changing anything it passes.
- **Hook ids.** `$props.id()` can't be called from a hook, so ids generated by `useCheckboxGroup` and `useRadioGroup` are numbered by the package (`ds1`, `ds2`, …).
- **Upstream quirks are kept**, so the markup matches: for example, Breadcrumbs and Pagination items drop `class`, Popover.Trigger drops `id`, and Skeleton writes its unused `characters` prop as an attribute.

## How 1:1 is checked

- **Digdir's own stories.** `test/upstream/` holds every story from Digdir's Storybook at the mirrored version, unchanged (`bun run vendor:stories` copies them). Each one is rendered with `@digdir/designsystemet-react`, and its Svelte twin in `test/storybook/twins/` must give the same result:
  - **in jsdom** (`test/storybook.test.tsx`): both mounted, effects run, compared after normalizing attribute and class order, with generated ids compared by which element they point at;
  - **on the server** (`test/storybook.ssr.test.tsx`): both rendered to HTML (react-dom/server and svelte/server) and compared the same way;
  - **in Chrome** (`test/storybook.browser.test.tsx`), with Digdir's CSS, its default theme and `designsystemet-web`: compared after the web layer has settled, then **Digdir's own play functions** run against React and against Svelte, must pass for both, and leave the same DOM;
  - **visually** (`test/visual.browser.test.tsx`): every element's position and size (within 1px) and its computed `color` and `background-color`.

  A story without a twin fails the test unless it is listed in `test/storybook/skipped/<file>.json` with the reason. The page setup copies Digdir's Storybook (`lang="no"`, instant animations, its `customStyles` decorator); React's StrictMode and Storybook's `layout: 'centered'` wrapper are left out on both sides.

  At 1.23.0: 295 upstream stories, every one with a twin that matches in jsdom, in Chrome and visually, and on the server apart from one (`DialogWithForm`, see `autofocus` above). 75 of them have play functions, and all 75 pass for React and Svelte with the same DOM after.
- **Every export.** `test/exports.test.ts` checks that every export of `@digdir/designsystemet-react` and every compound part is exported here under the same name, with no exceptions.
- **Interaction tests** (`test/*.test.tsx`) for what React implements itself, React and Svelte side by side: Combobox, Suggestion, Search, `autofocus`, the hooks, and controlled state in Details, Tabs, ToggleGroup, Dialog and Popover (`test/controlled.test.tsx`).
- **One version.** `bun run check:version` checks that `version`, every `@digdir/*` dependency and the vendored stories name the same upstream release.

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
bun run typecheck     # svelte-check
bun run test          # parity with @digdir/designsystemet-react (jsdom, server, Chrome), and interaction tests
bun run test:browser  # the Chrome tests only
bun run check:version
bun run build         # svelte-package → dist/
bun run package       # dist/ plus a package.json for it → package/, as installed
```

The Chrome tests run headless through WebdriverIO, which uses an installed Chrome (or downloads Chrome for Testing) and fetches a matching chromedriver. To use a particular Chrome, set `CHROME_BIN` to its executable.

To upgrade: bump `version` and every `@digdir/*` dependency together, run `bun run vendor:stories`, then `bun run test`. New and changed upstream stories fail until their twins (and the components) are updated.

## License

MIT. Based on [Designsystemet](https://github.com/digdir/designsystemet), © Digitaliseringsdirektoratet (Digdir), MIT. See [AI_DISCLOSURE.md](AI_DISCLOSURE.md) for how this port was written.
