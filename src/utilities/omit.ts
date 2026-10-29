type UnknownRecord = Record<string | number | symbol, unknown>;

/**
 * @deprecated Deprecated upstream: use `omit` from a utility library, or write your own.
 *
 * A copy of `obj` without the properties named in `names`, as React's `omit`.
 * @example omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> { b: 2, c: 3 }
 */
export const omit = (names: string[], obj: UnknownRecord): object => {
  const result: UnknownRecord = {};
  const index: Record<string, 1> = {};
  let idx = 0;
  const len = names.length;
  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }
  for (const prop in obj) if (!Object.hasOwn(index, prop)) result[prop] = obj[prop];
  return result;
};
