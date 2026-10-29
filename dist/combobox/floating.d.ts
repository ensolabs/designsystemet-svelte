/**
 * Hides everything in the body but `avoid` (and live regions) from assistive technology, as FloatingFocusManager does
 * for a modal floating element: `aria-hidden="true"` and `data-floating-ui-inert` on the elements beside the path to
 * each kept element. Returns the cleanup.
 */
export declare function markOthers(avoid: Element[], ariaHidden?: boolean, inert?: boolean): () => void;
/** The visually hidden styles of FocusGuard and the dismiss buttons. */
export declare const HIDDEN_STYLE = "border: 0px; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; white-space: nowrap; width: 1px; top: 0px; left: 0px";
/** The elements Tab reaches in `container`, in order (tabbable's order without display checks, as in jsdom). */
export declare function tabbable(container: Element): HTMLElement[];
/** FloatingFocusManager's list of where focus was, to return it there on close. */
export declare function addPreviouslyFocusedElement(element: Element | null): void;
export declare const getPreviouslyFocusedElement: () => Element | undefined;
export declare const isSafari: () => boolean;
/** A click from assistive technology or the keyboard, as floating-ui tells them apart. */
export declare function isVirtualClick(event: Event): boolean;
export declare function isVirtualPointerEvent(event: Event): boolean;
export declare function stopEvent(event: Event): void;
/** Focuses `el` on the next frame, cancelling the previous request. */
export declare function enqueueFocus(el: HTMLElement | undefined, options?: {
    preventScroll?: boolean;
}): void;
type List = (HTMLElement | null | undefined)[];
export declare function findNonDisabledIndex(list: List, { startingIndex, decrement }?: {
    startingIndex?: number | undefined;
    decrement?: boolean | undefined;
}): number;
export declare const getMinIndex: (list: List) => number;
export declare const getMaxIndex: (list: List) => number;
export declare const isIndexOutOfBounds: (list: List, index: number) => boolean;
export {};
