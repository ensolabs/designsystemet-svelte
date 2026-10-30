# Designsystemet for Svelte

Svelte 5 components for [Designsystemet](https://designsystemet.no), the Norwegian public sector's design system from Digdir.

Digdir publishes Designsystemet as CSS, as web components, and as React components. This package adds Svelte components to that set. They are the same components as Digdir's React package, [`@digdir/designsystemet-react`](https://www.npmjs.com/package/@digdir/designsystemet-react), with the same names and props, and they render the same HTML. So:

- **Digdir's CSS styles them.** [`@digdir/designsystemet-css`](https://www.npmjs.com/package/@digdir/designsystemet-css) and any Designsystemet theme work as they do with React. This package has no CSS of its own.
- **Digdir's web components drive them.** [`@digdir/designsystemet-web`](https://www.npmjs.com/package/@digdir/designsystemet-web) adds the behaviour (tabs, popovers, dialogs, field wiring, tooltips, suggestions), as it does for React. This package loads it for you.
- **Digdir's documentation applies.** The component pages on [designsystemet.no](https://designsystemet.no) and in [Digdir's Storybook](https://storybook.designsystemet.no) describe these components too. [Reading Digdir's examples](#reading-digdirs-examples) shows how their code translates to Svelte.

It is a port in the same spirit as Christian Ekrem's [Elm port](https://github.com/ensolabs/designsystemet-elm). It is not made or supported by Digdir.

## Install

Not on npm yet. Until it is, install the compiled package from this repository's `dist` branch, pinned to a commit, together with Digdir's CSS at the same version:

```sh
bun add github:ensolabs/designsystemet-svelte#<commit on dist> @digdir/designsystemet-css@1.23.0
```

Every commit on `dist` is a build of `main` that passed all checks, and its message names that `main` commit. Svelte 5.29 or later is required.

## Set up

Load Digdir's CSS and a theme once, in the root layout:

```svelte
<script lang="ts">
  import '@digdir/designsystemet-css';
  import '@digdir/designsystemet-css/theme'; // or your own theme, from theme.designsystemet.no
</script>
```

Then use the components:

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

Don't install `@digdir/designsystemet-web` yourself: the components load it, at the matching version. It does nothing during server rendering, so SvelteKit works as usual.

## Reading Digdir's examples

Digdir's documentation shows React code. The component names and props are the same here, with these Svelte forms:

| Digdir's React | Svelte |
| --- | --- |
| `className="x"`, `style={{ gap: 8 }}` | `class="x"`, `style="gap: 8px"` |
| children, and props that take elements | snippets; text-like props (`label`, `description`, `error`) take a string or a snippet |
| `<Tabs.List>` or `<TabsList>` | the same, both work |
| `readOnly`, `onClick`, `popoverTarget` | the HTML names: `readonly`, `onclick`, `popovertarget` |
| `value` with `onChange`, `open` with `onClose` | the same, or `bind:value`, `bind:open`, `bind:checked`, `bind:group` |
| `ref={myRef}` | `bind:ref={element}` |
| `asChild`, to render your own element | a `child` snippet; spread the `props` it gets on your element |
| hooks such as `useCheckboxGroup()` | the same functions, called while the component initializes |

`asChild` in Svelte:

```svelte
<Button variant="secondary">
  {#snippet child({ props })}<a href="/" {...props}>Til forsiden</a>{/snippet}
</Button>
```

Hooks return the same shape as Digdir's, with reactive values as getters (`group.value`). Where the React hook returns a plain value, the Svelte one returns `{ current }` (`useMediaQuery(query).current`). `pagination()` and the `synchronizedAnimation()` attachment are shorter Svelte forms of `usePagination` and `useSynchronizedAnimation`.

Every component and hook in Digdir's React package is here under the same name, including the deprecated ones (`Combobox`, `useMediaQuery`, `useDebounceCallback`, `RovingFocusRoot`).

## Where it differs

The HTML is always Digdir's. The differences are in how you use some components, where Svelte works differently from React:

- **`child` instead of `asChild`.** Your snippet renders the element, so the component can't put content into it: `Avatar` can't add the initials to your element, so write them yourself. `Dialog` has no `child`, because `asChild` on Digdir's Dialog always throws. `Chip.Checkbox` and `Chip.Radio` pass `{ props, input }`, and you render `{@render input()}` inside your element. `Tooltip` passes its attributes to `child`, or wraps plain text in `<span tabindex="0">`, as Digdir's does.
- **Controlled state.** Where a component manages its own state (Details `open`, Tabs and ToggleGroup `value`, Dialog and Popover `open`, Suggestion `selected`, Combobox `value`), passing the prop without `bind:` controls it, as in Digdir's React package: the component calls the callback and stays at your value until you change it. With `bind:`, it updates your variable. Dialog's `open` acts only when it changes: if the user closes the dialog while `open` stays `true`, it stays closed until `open` changes.
- **Native form controls keep Svelte's semantics.** `Input`, `Checkbox`, `Radio`, `Switch`, `Select` and `Textfield` behave like Svelte's own `<input>` and `<select>`. A `Radio` takes either `checked` or `bind:group`, not both.
- **Callbacks get values, not React events.**
- **`bind:indeterminate`** on a checkbox `Input`, where React needs a ref.
- **Combobox reads its options** by rendering its children apart from the page. Children other than options show once, in the open list, but their scripts and effects also run in that hidden pass. A `value` with no matching option is skipped; Digdir's React Combobox throws.
- **Suggestion** filters its list whenever its props or options change. Digdir's React one also re-filters on any re-render; that only differs if a script sets the input's value without an input event.
- **Generated ids** from `useCheckboxGroup` and `useRadioGroup` are numbered by the package (`ds1`, `ds2`, …).
- **`autofocus` on the server.** `autofocus="true"` is written as given in the browser, but as `autofocus=""` in server-rendered HTML.

Digdir's own oddities are kept, so the HTML matches: for example, Breadcrumbs and Pagination items drop `class`, Popover.Trigger drops `id`, and Skeleton writes its `characters` prop as an attribute.

## Versions

The version is the Designsystemet release this package matches: `1.23.0` matches Digdir's `1.23.0`. Use Digdir's CSS (and any other `@digdir/*` package) at the same version. A workflow checks npm every day for a newer Designsystemet release and opens an issue when there is one.

## How we know it matches

Digdir's React package is the reference: wherever this package and Digdir's React package differ in the HTML they produce, it's a bug here. The tests compare the two directly. They render each example both ways and compare the results:

- **Digdir's Storybook stories.** Every story from Digdir's Storybook at the matching version is copied into the repository unchanged, and each has a Svelte copy. Each pair must give the same HTML in a simulated DOM (jsdom), when rendered on the server, and in a real Chrome with Digdir's CSS and web components. In Chrome, every element must also have the same position, size and colours.
- **Digdir's interaction tests.** Storybook stories can carry interaction scripts ("play functions") that click and type and then check the result. Digdir's run against both versions; each must pass, and leave the same HTML.
- **Every export.** Every component, part (`Tabs.List`) and hook in Digdir's React package must exist here under the same name.
- **Behaviour** that Digdir implements in React rather than in its web components (Combobox, Suggestion, controlled state, the hooks) has side-by-side interaction tests.

At 1.23.0: all 295 of Digdir's stories match, in all four ways. The one exception is `DialogWithForm`'s server-rendered HTML, because of the `autofocus` difference above. All 75 of Digdir's interaction scripts pass for both versions.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md): how the code is laid out, how to port a component, how the tests work, and how to upgrade to a new Designsystemet release. Changes are listed in [CHANGELOG.md](CHANGELOG.md).

## License

MIT. Based on [Designsystemet](https://github.com/digdir/designsystemet), © Digitaliseringsdirektoratet (Digdir), MIT. Written with AI assistance; see [AI_DISCLOSURE.md](AI_DISCLOSURE.md).
