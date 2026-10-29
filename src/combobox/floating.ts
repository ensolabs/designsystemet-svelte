// The parts of @floating-ui/react@0.26.23 that React's Combobox uses and that aren't positioning (which is
// @floating-ui/dom's): FloatingFocusManager's markOthers and focus helpers, and useListNavigation's index helpers.

const counterMap = { current: new WeakMap<Element, number>() };
let uncontrolledElementsSet = new WeakSet<Element>();
let markerMap: Record<string, WeakMap<Element, number>> = {};
let lockCount = 0;

const unwrapHost = (node: Node | null): Node | null => node && ((node as unknown as ShadowRoot).host || unwrapHost(node.parentNode));

/**
 * Hides everything in the body but `avoid` (and live regions) from assistive technology, as FloatingFocusManager does
 * for a modal floating element: `aria-hidden="true"` and `data-floating-ui-inert` on the elements beside the path to
 * each kept element. Returns the cleanup.
 */
export function markOthers(avoid: Element[], ariaHidden = false, inert = false): () => void {
  const body = (avoid[0]?.ownerDocument ?? document).body;
  const uncorrected = avoid.concat(Array.from(body.querySelectorAll('[aria-live]')));
  const markerName = 'data-floating-ui-inert';
  const controlAttribute = inert ? 'inert' : ariaHidden ? 'aria-hidden' : null;
  const avoidElements = uncorrected
    .map((target) => {
      if (body.contains(target)) return target;
      const corrected = unwrapHost(target);
      return body.contains(corrected) ? (corrected as Element) : null;
    })
    .filter((x): x is Element => x != null);
  const elementsToKeep = new Set<Node>();
  const elementsToStop = new Set<Node>(avoidElements);
  const hiddenElements: Element[] = [];
  markerMap[markerName] ??= new WeakMap();
  const markerCounter = markerMap[markerName];

  const keep = (el: Node | null) => {
    if (!el || elementsToKeep.has(el)) return;
    elementsToKeep.add(el);
    if (el.parentNode) keep(el.parentNode);
  };
  const deep = (parent: Element | null) => {
    if (!parent || elementsToStop.has(parent)) return;
    for (const node of Array.from(parent.children)) {
      if (node.nodeName.toLowerCase() === 'script') continue;
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
        const alreadyHidden = attr !== null && attr !== 'false';
        const counterValue = (counterMap.current.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.current.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);
        if (counterValue === 1 && alreadyHidden) uncontrolledElementsSet.add(node);
        if (markerValue === 1) node.setAttribute(markerName, '');
        if (!alreadyHidden && controlAttribute) node.setAttribute(controlAttribute, 'true');
      }
    }
  };
  avoidElements.forEach(keep);
  deep(body);
  elementsToKeep.clear();
  lockCount++;
  return () => {
    for (const element of hiddenElements) {
      const counterValue = (counterMap.current.get(element) || 0) - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;
      counterMap.current.set(element, counterValue);
      markerCounter.set(element, markerValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) element.removeAttribute(controlAttribute);
        uncontrolledElementsSet.delete(element);
      }
      if (!markerValue) element.removeAttribute(markerName);
    }
    lockCount--;
    if (!lockCount) {
      counterMap.current = new WeakMap();
      uncontrolledElementsSet = new WeakSet();
      markerMap = {};
    }
  };
}

/** The visually hidden styles of FocusGuard and the dismiss buttons. */
export const HIDDEN_STYLE =
  'border: 0px; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; white-space: nowrap; width: 1px; top: 0px; left: 0px';

const TABBABLE =
  'input:not([type=hidden]), select, textarea, a[href], button, audio[controls], video[controls], [contenteditable]:not([contenteditable=false]), details > summary:first-of-type, details, [tabindex]';

/** The elements Tab reaches in `container`, in order (tabbable's order without display checks, as in jsdom). */
export function tabbable(container: Element): HTMLElement[] {
  const all = Array.from(container.querySelectorAll<HTMLElement>(TABBABLE)).filter(
    (el) => !(el as HTMLButtonElement).disabled && el.tabIndex >= 0 && !el.closest('[inert]'),
  );
  const positive = all.filter((el) => el.tabIndex > 0).sort((a, b) => a.tabIndex - b.tabIndex);
  return [...positive, ...all.filter((el) => el.tabIndex === 0)];
}

const isTabbable = (el: Element) => el.matches(TABBABLE) && tabbable(el.parentElement ?? el).includes(el as HTMLElement);

let previouslyFocusedElements: Element[] = [];

/** FloatingFocusManager's list of where focus was, to return it there on close. */
export function addPreviouslyFocusedElement(element: Element | null) {
  previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
  let tabbableEl = element;
  if (!tabbableEl || tabbableEl.nodeName.toLowerCase() === 'body') return;
  if (!isTabbable(tabbableEl)) tabbableEl = tabbable(tabbableEl)[0] ?? tabbableEl;
  previouslyFocusedElements.push(tabbableEl);
  if (previouslyFocusedElements.length > 20) previouslyFocusedElements = previouslyFocusedElements.slice(-20);
}

export const getPreviouslyFocusedElement = () =>
  previouslyFocusedElements
    .slice()
    .reverse()
    .find((el) => el.isConnected);

export const isSafari = () => typeof navigator !== 'undefined' && /apple/i.test(navigator.vendor);

const userAgent = () => (navigator as Navigator & { userAgentData?: { brands: { brand: string; version: string }[] } }).userAgentData?.brands.map(({ brand, version }) => `${brand}/${version}`).join(' ') ?? navigator.userAgent;
const platform = () => (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform;
const isAndroid = () => /android/i.test(platform()) || /android/i.test(userAgent());

/** A click from assistive technology or the keyboard, as floating-ui tells them apart. */
export function isVirtualClick(event: Event): boolean {
  const e = event as PointerEvent & { mozInputSource?: number };
  if (e.mozInputSource === 0 && e.isTrusted) return true;
  if (isAndroid() && e.pointerType) return e.type === 'click' && e.buttons === 1;
  return e.detail === 0 && !e.pointerType;
}

export function isVirtualPointerEvent(event: Event): boolean {
  if (userAgent().includes('jsdom/')) return false;
  const e = event as PointerEvent;
  return (
    (!isAndroid() && e.width === 0 && e.height === 0) ||
    (isAndroid() && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === 'mouse') ||
    (e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === 'touch')
  );
}

export function stopEvent(event: Event) {
  event.preventDefault();
  event.stopPropagation();
}

let rafId = 0;
/** Focuses `el` on the next frame, cancelling the previous request. */
export function enqueueFocus(el: HTMLElement | undefined, options: { preventScroll?: boolean } = {}) {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => el?.focus({ preventScroll: options.preventScroll ?? false }));
}

// useListNavigation: indexes into the list of items, skipping missing and disabled ones.
type List = (HTMLElement | null | undefined)[];

const isDisabled = (list: List, index: number) => {
  const element = list[index];
  return element == null || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
};

export function findNonDisabledIndex(list: List, { startingIndex = -1, decrement = false } = {}): number {
  let index = startingIndex;
  do index += decrement ? -1 : 1;
  while (index >= 0 && index <= list.length - 1 && isDisabled(list, index));
  return index;
}

export const getMinIndex = (list: List) => findNonDisabledIndex(list);
export const getMaxIndex = (list: List) => findNonDisabledIndex(list, { decrement: true, startingIndex: list.length });
export const isIndexOutOfBounds = (list: List, index: number) => index < 0 || index >= list.length;
