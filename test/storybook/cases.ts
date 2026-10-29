// Every story in Digdir's Storybook (test/upstream/, vendored by scripts/vendor-stories.ts), paired with its Svelte
// twin: test/storybook/twins/<file>.svelte, named after the upstream file (button.stories.tsx → button.svelte), exports
// a snippet per story under the story's export name. A story without a twin must be listed, with the reason, in
// test/storybook/skipped/<file>.json: { "<export name>": "<why>" }. A twin that matches in one of the two comparisons
// only is listed with the reason for the other: { "<export name>": { "ssr": "<why>" } } (or "dom").
import type { ReactElement } from 'react';
import type { Snippet } from 'svelte';
import { isStory, type Story } from './runtime';

export type Case = {
  /** Storybook's id, as on storybook.designsystemet.no: komponenter-button--preview. */
  id: string;
  file: string;
  name: string;
  react: () => ReactElement;
  svelte: Snippet | undefined;
  /** Why the story isn't compared in the DOM (test/storybook.test.tsx). */
  skip: string | undefined;
  /** Why the story isn't compared on the server (test/storybook.ssr.test.tsx). */
  skipSsr: string | undefined;
};

type Skip = string | { dom?: string; ssr?: string };

const stories = import.meta.glob<Record<string, unknown>>('../upstream/packages/react/**/*.stories.tsx', { eager: true });
const twins = import.meta.glob<Record<string, unknown>>('./twins/*.svelte', { eager: true });
const skipped = import.meta.glob<Record<string, Skip>>('./skipped/*.json', { eager: true, import: 'default' });

/** Storybook's sanitize: lower case, anything but letters and digits becomes one dash. */
const sanitize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
/** Storybook's storyNameFromExport, then sanitize: ColorsHover → colors-hover. */
const exportToId = (name: string) => sanitize(name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'));

export const cases: Case[] = Object.entries(stories).flatMap(([path, module]: [string, Record<string, unknown>]) => {
  const file = path.split('/').pop()!.replace(/\.stories\.tsx$/, '');
  const twin = twins[`./twins/${file}.svelte`];
  return Object.entries(module)
    .filter(([name, value]) => name !== 'default' && isStory(value))
    .map(([name, value]) => {
      const story = value as Story;
      const id = `${sanitize(story.title)}--${exportToId(name)}`;
      const skip = skipped[`./skipped/${file}.json`]?.[name];
      return {
        id,
        file,
        name,
        react: story.element,
        svelte: twin?.[name] as Snippet | undefined,
        skip: typeof skip === 'object' ? skip.dom : skip,
        skipSsr: typeof skip === 'object' ? skip.ssr : skip,
      };
    });
});
