import { getContext, setContext } from 'svelte';

export type RovingFocusOrientation = 'vertical' | 'horizontal' | 'ambiguous';
export type RovingItem = { value: string; element: HTMLElement };

/** What RovingFocusRoot shares with its RovingFocusItems, as React's `RovingFocusContext`. */
export type RovingFocusContext = {
  elements: Map<string, HTMLElement>;
  getOrderedItems: () => RovingItem[];
  setFocusableValue: (value: string | null) => void;
  onShiftTab: () => void;
  readonly focusableValue: string | null;
  readonly orientation: RovingFocusOrientation;
};

const key = Symbol('RovingFocusContext');

const fallback: RovingFocusContext = {
  elements: new Map(),
  getOrderedItems: () => [],
  setFocusableValue: () => {},
  onShiftTab: () => {},
  focusableValue: null,
  orientation: 'horizontal',
};

export const setRovingFocusContext = (context: RovingFocusContext) => setContext(key, context);
export const getRovingFocusContext = (): RovingFocusContext => getContext<RovingFocusContext | undefined>(key) ?? fallback;
