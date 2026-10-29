/**
 * Keeps a CSS animation in step with every other element running the same `animationName`, as React's
 * `useSynchronizedAnimation` does. Use as `{@attach synchronizedAnimation('ds-spinner-rotate-animation')}`.
 */
export declare function synchronizedAnimation(animationName: string): (element: Element) => (() => void) | undefined;
