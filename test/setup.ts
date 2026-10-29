// jsdom has neither the popover API nor HTMLDialogElement.showModal. These stand-ins do what the browser does for the
// components: open and close, the async toggle and close events, popovertarget buttons, and Escape closing the last
// popover or the dialog. The top layer, light dismiss and the dialog's focus trap are left to the browser.

const shown = new Set<HTMLElement>();

function queueToggle(el: HTMLElement, newState: 'open' | 'closed') {
  setTimeout(() => el.dispatchEvent(Object.assign(new Event('toggle'), { newState, oldState: newState === 'open' ? 'closed' : 'open' })));
}

Object.assign(HTMLElement.prototype, {
  showPopover(this: HTMLElement) {
    if (shown.has(this)) return;
    shown.add(this);
    // jsdom hides [popover] elements and won't focus inside hidden ones.
    this.style.display = 'block';
    queueToggle(this, 'open');
  },
  hidePopover(this: HTMLElement) {
    if (!shown.delete(this)) return;
    this.style.removeProperty('display');
    queueToggle(this, 'closed');
  },
  togglePopover(this: HTMLElement, force?: boolean | { force?: boolean }) {
    const wanted = typeof force === 'object' ? force.force : force;
    if (wanted === undefined ? shown.has(this) : !wanted) (this as any).hidePopover();
    else (this as any).showPopover();
    return shown.has(this);
  },
});

const dialogProto = (globalThis.HTMLDialogElement ?? HTMLElement).prototype;
Object.assign(dialogProto, {
  show(this: HTMLElement) {
    this.setAttribute('open', '');
  },
  showModal(this: HTMLElement) {
    this.setAttribute('open', '');
  },
  close(this: HTMLElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    setTimeout(() => this.dispatchEvent(new Event('close')));
  },
});
if (!('open' in dialogProto)) {
  Object.defineProperty(dialogProto, 'open', {
    get(this: HTMLElement) {
      return this.hasAttribute('open');
    },
  });
}

document.addEventListener('click', (e) => {
  const invoker = (e.target as Element).closest?.('[popovertarget]');
  const target = invoker && document.getElementById(invoker.getAttribute('popovertarget')!);
  if (target) (target as any).togglePopover();
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || e.defaultPrevented) return;
  const last = [...shown].filter((el) => el.isConnected).pop();
  if (last) return (last as any).hidePopover();
  const dialog = document.querySelector('dialog[open]');
  if (dialog && dialog.dispatchEvent(new Event('cancel', { cancelable: true }))) (dialog as any).close();
});

// jsdom has no Web Animations; the spinners only use it to keep in step.
document.getAnimations ??= () => [];

// jsdom has no matchMedia: a stand-in for a wide screen, where no media query matches, as useMediaQuery's story needs.
window.matchMedia ??= (media: string) =>
  ({
    matches: false,
    media,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  }) as MediaQueryList;
