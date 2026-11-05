# Changelog

Versions follow Designsystemet: version `x.y.z` of this package matches Digdir's `x.y.z`. A fix to the port alone is released as `x.y.z-fix.N` for the same Designsystemet release.

## 1.23.0

The first version, matching Designsystemet 1.23.0.

- Every component, compound part and hook of `@digdir/designsystemet-react` 1.23.0, under the same names, including the deprecated `Combobox`, `useMediaQuery`, `useDebounceCallback` and `RovingFocus*`.
- Controlled state as in Digdir's components (Details, Tabs, ToggleGroup, Dialog, Popover, Suggestion, Combobox), with `bind:` as Svelte's form of it.
- All 295 of Digdir's Storybook stories match Digdir's React components: in jsdom, as server-rendered HTML, and in Chrome by HTML, layout and colour. All 75 of Digdir's play functions pass for both. One difference remains (`autofocus` in server-rendered HTML; see the README).
- Published to npm by the Release workflow, with provenance. Every build of `main` is also on the `dist` branch.
- A daily check for new Designsystemet releases, which opens an issue for each.
