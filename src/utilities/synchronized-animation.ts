/**
 * Keeps a CSS animation in step with every other element running the same `animationName`, as React's
 * `useSynchronizedAnimation` does. Use as `{@attach synchronizedAnimation('ds-spinner-rotate-animation')}`.
 */
export function synchronizedAnimation(animationName: string) {
  return (element: Element) => {
    if (typeof document.getAnimations !== 'function') return;
    const animations = document
      .getAnimations()
      .filter((animation) => 'animationName' in animation && animation.animationName === animationName);
    const firstOfType = animations[0];
    const myAnimation = animations.find((animation) => animation.effect && (animation.effect as KeyframeEffect).target === element);
    if (myAnimation && myAnimation === firstOfType) myAnimation.currentTime = 0;
    if (myAnimation && firstOfType?.currentTime && myAnimation !== firstOfType) myAnimation.currentTime = firstOfType.currentTime;
    return () => {
      if (myAnimation && firstOfType?.currentTime) myAnimation.currentTime = firstOfType.currentTime;
    };
  };
}
