# Contributing

This package is a port: Svelte components that match Digdir's React components ([`@digdir/designsystemet-react`](https://www.npmjs.com/package/@digdir/designsystemet-react)) exactly. Digdir's package is the specification. A contribution either makes the port match it more closely, or follows it to a new release. Anything else — a new component, a new prop, a style, a fix to how a component behaves — belongs upstream, in [digdir/designsystemet](https://github.com/digdir/designsystemet), and arrives here with the next release.

## Set up

You need [Bun](https://bun.sh) and Node 24. For the browser tests, Chrome: an installed Chrome works, or WebdriverIO downloads Chrome for Testing. To use a particular Chrome, set `CHROME_BIN` to its executable.

```sh
bun install
bun run typecheck      # svelte-check
bun run test           # every test project: jsdom, server and Chrome
bun run test:browser   # the Chrome tests only (about 2 minutes)
bun run check:version  # this package, Digdir's packages and the copied stories at one version
bun run build          # svelte-package → dist/
bun run package        # dist/ and its package.json → package/, as installed
```

CI runs `typecheck`, `test`, `build` and `check:version` on every push and pull request. On `main`, it then commits `package/` to the `dist` branch, which is what apps install until the package is on npm.

## How the code is laid out

| path | what |
| --- | --- |
| `src/<name>/` | one component per file, `<Name>.svelte`; `index.ts` assembles compound components (`Object.assign(Root, { Part })`) and their flat exports (`TabsList`) |
| `src/utilities/` | the hooks (`use-*.svelte.ts`), attachments and helpers |
| `src/index.ts` | every export, under Digdir's names |
| `test/upstream/` | Digdir's Storybook stories at the matching release, copied unchanged by `bun run vendor:stories`. Don't edit. |
| `test/storybook/twins/` | the Svelte copy of each story: `<file>.svelte` exports a snippet per story, named as the story's export (`button.stories.tsx` → `button.svelte`) |
| `test/storybook/skipped/` | stories that can't match, with the reason (one, at 1.23.0) |
| `test/storybook/runtime.tsx` | a small stand-in for Storybook, so the stories render without it |
| `test/stories/`, `test/*.test.tsx` | interaction tests for behaviour Digdir implements in React itself |
| `test/canonical.ts` | turns a DOM into comparable text: attribute order, generated ids and the like normalized |
| `scripts/` | copying the stories, the version check, packaging, the upstream check |

## Porting a component

1. **Read Digdir's source, not the docs**: `node_modules/@digdir/designsystemet-react/dist/esm/components/<name>/*.js` and the `.d.ts` beside it. Port every prop, default and attribute, in the same element structure.
2. **Same HTML.** The same elements, classes, `data-*` and `aria-*` attributes, with the same defaults. Leave an attribute out exactly when React does (React drops `undefined`, `null` and `false` for `data-*`; check each case).
3. **No styles and no behaviour of our own.** What Digdir leaves to `@digdir/designsystemet-web`, leave to it too. What Digdir does in React (an effect, a handler, a context), port with runes, `setContext`/`getContext` and `{@attach}`.
4. **Svelte forms for React idioms**, as the README's "Reading Digdir's examples" lists: snippets for children, a `child` snippet for `asChild`, HTML attribute names, `$bindable` for state and `ref`. Controlled state follows Digdir's: see `src/details/Details.svelte` for how a prop tells `bind:` from a plain prop.
5. **Icons**: where Digdir renders an `@navikt/aksel-icons` component, inline the same SVG.
6. **Keep Digdir's oddities.** If Digdir's HTML is odd but harmless (an unused attribute, a dropped `class`), match it, so the comparison stays exact.
7. **Don't name a variable `props`**; it clashes with `$props()`.
8. **Test it.** Each of Digdir's stories for the component needs a twin in `test/storybook/twins/`. If the component has behaviour Digdir implements in React, add an interaction test that runs the same steps on both and compares the DOM after each (see `test/details.test.tsx` and `test/interaction.ts`).

A story that can't match goes in `test/storybook/skipped/<file>.json` with a precise reason, for one comparison (`{ "Story": { "ssr": "why" } }`) or all. Treat that as a last resort. Every remaining difference is listed in the README's "Where it differs", so update that too.

## How the tests compare

- **Story tests** render each of Digdir's stories with Digdir's React package and its twin with this package, then compare the two:
  - in jsdom: `test/storybook.test.tsx`;
  - as server-rendered HTML: `test/storybook.ssr.test.tsx`;
  - in Chrome with Digdir's CSS and web components: `test/storybook.browser.test.tsx`;
  - by layout and colour: `test/visual.browser.test.tsx`.
- **Play functions.** In Chrome, a story's play function then runs against each side. It must pass for both, and leave the same DOM.
- **Comparison rules.** `test/canonical.ts` sorts attributes and classes, and compares generated ids by which element they point at. Loosen it only for differences that come from the test setup itself, never to hide a difference in the components, and say why in a comment.

When a test fails, the expected value is React's and the received value is Svelte's.

## Upgrading to a new Designsystemet release

The `Upstream` workflow checks npm daily and opens an issue when Digdir has released a new version. To upgrade:

1. Read Digdir's release notes, and the diff of `packages/react/src` between the two tags.
2. Set `version` in `package.json`, and every `@digdir/*` dependency, to the new version. `bun install`.
3. `bun run vendor:stories` copies the new release's stories into `test/upstream/`.
4. `bun run test`. New and changed stories fail until their twins, and the components, are updated. Port each change.
5. `bun run check:version`, `bun run typecheck`, and update the README's numbers (stories, play functions) and the CHANGELOG.

The upgrade is one pull request, titled `Designsystemet <version>`.

## Pull requests

- One change per pull request, with tests; CI must pass.
- Describe what you compared against: the Digdir file or story.
- Don't change `test/upstream/` by hand, or loosen `test/canonical.ts`, to make a test pass.
- AI-assisted contributions are welcome. Say so in the pull request, and update `AI_DISCLOSURE.md` if the models or the scope change.

## Reporting problems

If a component's HTML or behaviour differs from Digdir's React component, that's a bug here: open an issue with the component, what you did, and what Digdir's React component does. If Digdir's component itself is wrong, report it to [digdir/designsystemet](https://github.com/digdir/designsystemet/issues). The fix will come here with the release that has it. Security problems: see [SECURITY.md](SECURITY.md).
