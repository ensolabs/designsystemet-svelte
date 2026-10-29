import { getContext, setContext } from 'svelte';

/** What a ToggleGroup tells its items, as React's `ToggleGroupContext`. */
export type ToggleGroupContext = {
  readonly defaultValue?: string;
  readonly name?: string;
  readonly value?: string;
  readonly variant?: 'primary' | 'secondary';
  onChange?: (value: string) => void;
};

const key = Symbol('ToggleGroup');

export const setToggleGroup = (context: ToggleGroupContext) => setContext(key, context);
export const getToggleGroup = (): ToggleGroupContext => getContext<ToggleGroupContext | undefined>(key) ?? {};
