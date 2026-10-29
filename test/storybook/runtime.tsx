// A stand-in for Storybook's CSF factories (`definePreview`, `preview.meta`, `meta.story`), enough to render an
// upstream story as a React element: args merged from meta and story, `render` (or the meta's component), and the
// story's and meta's decorators. Storybook's own global decorator (customStylesDecorator) only lays the story out, so
// it is left out, on both sides. The story keeps its play function (or the meta's), for the browser tests to run.
import { createContext, createElement, useContext, useState, type ComponentType, type ReactElement, type ReactNode } from 'react';

type Args = Record<string, unknown>;
type Context = { args: Args; parameters: Record<string, unknown>; globals: Record<string, unknown>; argTypes: Record<string, unknown> };
type Decorator = (Story: ComponentType, context: Context) => ReactNode;
type Render = (args: Args, context: Context) => ReactNode;
/** What Storybook passes a play function (StoryContext), as far as a story without Storybook can have it. */
export type PlayContext = Context & {
  id: string;
  name: string;
  title: string;
  canvasElement: HTMLElement;
  canvas: unknown;
  userEvent: unknown;
  step: (label: string, play: () => unknown) => Promise<void>;
  viewMode: 'story';
  loaded: Record<string, unknown>;
  abortSignal: AbortSignal;
  context: PlayContext;
};
export type Play = (context: PlayContext) => unknown;
type Annotations = {
  title?: string;
  component?: ComponentType<any>;
  args?: Args;
  parameters?: Record<string, unknown>;
  decorators?: Decorator | Decorator[];
  render?: Render;
  play?: Play;
  [key: string]: unknown;
};

const STORY = Symbol('story');

export type Story = {
  [STORY]: true;
  title: string;
  /** The story's own annotations, as Storybook's story objects have them (stories read each other's). */
  input: Record<string, unknown>;
  /** A story built on this one, as Storybook's `story.extend`: args and parameters merge, decorators add up. */
  extend: (more: Annotations) => Story;
  /** The story as a React element, as Storybook would render it without its global decorator. */
  element: () => ReactElement;
  /** The args the story starts with: the meta's, then the story's. */
  args: Args;
  parameters: Record<string, unknown>;
  /** The story's play function, or else the meta's, as Storybook picks it. */
  play: Play | undefined;
};

export function isStory(value: unknown): value is Story {
  return typeof value === 'object' && value !== null && STORY in value;
}

const ArgsContext = createContext<[Args, (update: Args) => void]>([{}, () => {}]);

/** `useArgs` from storybook/preview-api: the story's args, and a setter that re-renders the story with new ones. */
export function useArgs() {
  return useContext(ArgsContext);
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;

/** Storybook's combineParameters: plain objects merge, deeply; anything else is replaced. */
export function combineParameters(...all: (Record<string, unknown> | undefined)[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const parameters of all)
    for (const [key, value] of Object.entries(parameters ?? {}))
      out[key] = isPlainObject(value) && isPlainObject(out[key]) ? combineParameters(out[key], value) : value;
  return out;
}

const list = (decorators: Decorator | Decorator[] | undefined) => (decorators ? [decorators].flat() : []);

function story(meta: Annotations, input: Annotations | Render): Story {
  const annotations: Annotations = typeof input === 'function' ? { render: input } : input;
  const render = annotations.render ?? meta.render ?? ((args: Args) => createElement(meta.component!, args));
  // The story's decorators wrap the story first, then the meta's.
  const decorators = [...list(annotations.decorators), ...list(meta.decorators)];
  const parameters = combineParameters(meta.parameters, annotations.parameters);

  function Root() {
    const [args, setArgs] = useState<Args>({ ...meta.args, ...annotations.args });
    const update = (next: Args) => setArgs((current) => ({ ...current, ...next }));
    const context: Context = { args, parameters, globals: {}, argTypes: {} };
    let Story: ComponentType = () => <>{render(args, context)}</>;
    for (const decorator of decorators) {
      const Inner: ComponentType = Story;
      Story = (): ReactElement => <>{decorator(Inner, context)}</>;
    }
    return (
      <ArgsContext.Provider value={[args, update]}>
        <Story />
      </ArgsContext.Provider>
    );
  }

  const extend = (more: Annotations) =>
    story(meta, {
      ...annotations,
      ...more,
      args: { ...annotations.args, ...more.args },
      parameters: combineParameters(annotations.parameters, more.parameters),
      decorators: [...list(more.decorators), ...list(annotations.decorators)],
    });

  return {
    [STORY]: true,
    title: meta.title ?? '',
    input: annotations,
    extend,
    element: () => <Root />,
    args: { ...meta.args, ...annotations.args },
    parameters,
    play: annotations.play ?? meta.play,
  };
}

export default {
  meta(meta: Annotations) {
    return { ...meta, story: (input: Annotations | Render = {}) => story(meta, input) };
  },
};
