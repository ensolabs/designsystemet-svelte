// The page the browser project's stories render in, set up as Digdir's Storybook sets up its own for its Vitest runs
// (apps/storybook/.storybook/preview.tsx, preview-head.html and vitest.setup.ts at the mirrored version): Digdir's CSS
// and default theme, `lang="no"`, and instant animations and transitions. Also no scrollbar, which would
// otherwise come and go with the stories' heights and change the size of floating elements. The components load
// @digdir/designsystemet-web themselves, React's and ours alike.
import '@digdir/designsystemet-css';
import '@digdir/designsystemet-css/theme';

document.documentElement.setAttribute('lang', 'no');

document.head.appendChild(
  Object.assign(document.createElement('style'), {
    textContent: `*, *::before, *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
    transition-delay: 0ms !important;
    animation-delay: 0ms !important;
  }`,
  }),
);

document.head.appendChild(
  Object.assign(document.createElement('style'), { textContent: 'html { scrollbar-width: none; }' }),
);
