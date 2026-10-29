import { getContext, setContext } from 'svelte';

/** What Tabs shares with its tabs and panels, as React's tabs `Context`. */
export type TabsContext = {
  readonly isControlled: boolean;
  readonly currentValue: string | undefined;
  onChange?: (value: string) => void;
  getPrefixedValue?: (value: string) => string;
};

const key = Symbol('Tabs');

export const setTabsContext = (context: TabsContext) => setContext(key, context);
export const getTabsContext = (): Partial<TabsContext> => getContext<TabsContext | undefined>(key) ?? {};
