type UnknownRecord = Record<string | number | symbol, unknown>;
/**
 * @deprecated Deprecated upstream: use `omit` from a utility library, or write your own.
 *
 * A copy of `obj` without the properties named in `names`, as React's `omit`.
 * @example omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> { b: 2, c: 3 }
 */
export declare const omit: (names: string[], obj: UnknownRecord) => object;
export {};
