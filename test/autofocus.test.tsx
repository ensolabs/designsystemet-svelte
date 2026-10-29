// `autofocus` as a string is written as it is, in the DOM, as React writes a lower-case `autofocus`: Digdir's
// DialogWithForm story writes autofocus="true" so the Dialog focuses the input when it opens. Neither side focuses the
// element when it mounts (React only does that for `autoFocus`).
import { Input, Textarea, Textfield } from '@digdir/designsystemet-react';
import { expect, test } from 'vitest';
import { both } from './parity';
import * as S from './stories/autofocus.svelte';

test('autofocus as a string', async () => {
  const lower = (value: string) => ({ autofocus: value }) as object;
  const out = await both(
    <>
      <Input {...lower('true')} aria-label="Input" />
      <Textarea {...lower('true')} aria-label="Textarea" />
      <Textfield {...lower('')} label="Textfield" />
      <Textfield multiline {...lower('true')} label="Textfield multiline" />
    </>,
    S.autofocusString,
  );
  expect(out.svelte).toBe(out.react);
  expect(out.svelte).toContain('autofocus="true"');
  expect(document.activeElement).toBe(document.body);
});
