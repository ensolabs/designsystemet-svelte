# Changelog

Versions follow Designsystemet: version `x.y.z` of this package matches Digdir's `x.y.z`. A fix to the port alone gets no version of its own; it replaces the build of the version it fixes, and is listed here under that version.

## 1.23.0 (not yet on npm)

The first version, matching Designsystemet 1.23.0.

- Every component, compound part and hook of `@digdir/designsystemet-react` 1.23.0, under the same names, including the deprecated `Combobox`, `useMediaQuery`, `useDebounceCallback` and `RovingFocus*`.
- Controlled state as in Digdir's components (Details, Tabs, ToggleGroup, Dialog, Popover, Suggestion, Combobox), with `bind:` as Svelte's form of it.
- All 295 of Digdir's Storybook stories match Digdir's React components: in jsdom, as server-rendered HTML, and in Chrome by HTML, layout and colour. All 75 of Digdir's play functions pass for both. One difference remains (`autofocus` in server-rendered HTML; see the README).
- Installed from the compiled `dist` branch, built by CI from `main`.
- A daily check for new Designsystemet releases, which opens an issue for each.
