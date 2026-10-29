// Every upstream story with a twin, in a real browser (headless Chrome, with Digdir's CSS and theme, and
// designsystemet-web), mounted with Digdir's React components and then with the Svelte twin, each in a container of its
// own:
//   - once designsystemet-web has settled, the DOMs must match;
//   - if Storybook would run a play function for the story (the story's, or else the meta's), it is Digdir's own, run
//     on each container as Storybook runs it. It must pass for React and for Svelte, and the DOMs must match after it.
// test/storybook/play.json lists, with the reason ({ "<file>": { "<export name>": "<why>" } }):
//   failsForReact    play functions that fail for React itself here. Each must still fail for React (or the entry is
//                    stale), and fail for Svelte the same way, leaving the same DOM.
//   differsByDesign  play functions after which the DOMs differ by design (see "Differences from React" in the README).
//                    Each must pass for both, and the DOMs must still differ.
import { describe, expect, test } from 'vitest';
import { mountStory, settle, type Side } from './browser';
import { canonical } from './canonical';
import { cases, type Case } from './storybook/cases';
import known from './storybook/play.json';
import type { PlayContext } from './storybook/runtime';
import { userEvent, within } from './storybook/storybook-test';

const failsForReact = known.failsForReact as Record<string, Record<string, string>>;
const differsByDesign = known.differsByDesign as Record<string, Record<string, string>>;
const ported = cases.filter((c) => !c.skip && c.svelte);

const PLAY_TIMEOUT = 10_000;

async function render(c: Case, side: Side): Promise<string> {
  const mounted = await mountStory(c, side);
  const dom = canonical(mounted.container);
  await mounted.unmount();
  return dom;
}

/** The context Storybook 10 passes a play function, for a story rendered in `canvasElement`. */
function playContext(c: Case, canvasElement: HTMLElement): PlayContext {
  const context = {
    id: c.id,
    name: c.storyName,
    title: c.title,
    args: c.args,
    parameters: c.parameters,
    globals: {},
    argTypes: {},
    canvasElement,
    canvas: within(canvasElement),
    userEvent: userEvent.setup(),
    step: async (_label: string, play: () => unknown) => {
      await play();
    },
    viewMode: 'story',
    loaded: {},
    abortSignal: new AbortController().signal,
  } as Omit<PlayContext, 'context'> as PlayContext;
  context.context = context;
  return context;
}

type Played = { error: string | undefined; dom: string };

async function play(c: Case, side: Side): Promise<Played> {
  const mounted = await mountStory(c, side);
  let error: string | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      c.play!(playContext(c, mounted.container)),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`play did not finish within ${PLAY_TIMEOUT} ms`)), PLAY_TIMEOUT);
      }),
    ]);
  } catch (e) {
    // The first line: testing-library's messages go on with a dump of the DOM, generated ids and all.
    error = (e instanceof Error ? `${e.name}: ${e.message}` : String(e)).split('\n')[0];
  } finally {
    clearTimeout(timer);
  }
  await settle();
  const dom = canonical(mounted.container);
  await mounted.unmount();
  return { error, dom };
}

describe.each([...new Set(ported.map((c) => c.file))])('%s', (file) => {
  for (const c of ported.filter((c) => c.file === file)) {
    test(c.name, async () => {
      const react = await render(c, 'react');
      const svelte = await render(c, 'svelte');
      expect(svelte).toBe(react);
    });

    if (!c.play) continue;
    const fails = failsForReact[file]?.[c.name];
    const differs = differsByDesign[file]?.[c.name];
    const note = fails ? ' (fails for React, see test/storybook/play.json)' : differs ? ' (differs by design, see test/storybook/play.json)' : '';
    test(`${c.name} ▸ play${note}`, async () => {
      const react = await play(c, 'react');
      const svelte = await play(c, 'svelte');
      if (fails) {
        expect(react.error, 'listed in failsForReact in test/storybook/play.json, but passes for React').toBeDefined();
        expect(svelte.error).toBe(react.error);
      } else {
        expect(react.error, 'React').toBeUndefined();
        expect(svelte.error, 'Svelte').toBeUndefined();
      }
      if (differs) expect(svelte.dom, 'listed in differsByDesign in test/storybook/play.json, but the DOMs match').not.toBe(react.dom);
      else expect(svelte.dom).toBe(react.dom);
    });
  }
});
