// storybook/test (Storybook 10), from the pieces Storybook bundles into it: everything from @testing-library/dom
// (`within` is its getQueriesForElement), the default export of @testing-library/user-event (its direct API plus
// `setup`), an `expect` with @testing-library/jest-dom's matchers (vitest's, where Storybook's is @vitest/expect over
// chai), and the mock functions of @vitest/spy (vitest's `vi`). Storybook only adds instrumentation for its
// interactions panel, which changes nothing about what a play function does.
//
// The dom and ssr projects only use `fn` (for callback args) while rendering; the browser project runs play functions.
import * as matchers from '@testing-library/jest-dom/matchers';
import userEventLib from '@testing-library/user-event';
import { expect as vitestExpect, vi } from 'vitest';

export * from '@testing-library/dom';
export { getQueriesForElement as within } from '@testing-library/dom';

vitestExpect.extend(matchers);
export const expect = vitestExpect;

export const userEvent = userEventLib;
export const uninstrumentedUserEvent = userEventLib;

export const fn = vi.fn;
export const spyOn = vi.spyOn;
export const isMockFunction = vi.isMockFunction;
export const mocked = vi.mocked;
export const clearAllMocks = vi.clearAllMocks;
export const resetAllMocks = vi.resetAllMocks;
export const restoreAllMocks = vi.restoreAllMocks;
export const sb = { mock: () => {} };
