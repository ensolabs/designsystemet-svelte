export type RovingFocusOrientation = 'vertical' | 'horizontal' | 'ambiguous';
export type RovingItem = {
    value: string;
    element: HTMLElement;
};
/** What RovingFocusRoot shares with its RovingFocusItems, as React's `RovingFocusContext`. */
export type RovingFocusContext = {
    elements: Map<string, HTMLElement>;
    getOrderedItems: () => RovingItem[];
    setFocusableValue: (value: string | null) => void;
    onShiftTab: () => void;
    readonly focusableValue: string | null;
    readonly orientation: RovingFocusOrientation;
};
export declare const setRovingFocusContext: (context: RovingFocusContext) => RovingFocusContext;
export declare const getRovingFocusContext: () => RovingFocusContext;
