// Stand-ins for storybook/test. Only `fn` matters when rendering (it is used for callback args); the rest serve play
// functions, which don't run here.
export const fn = <T extends (...args: any[]) => any>(implementation?: T) => implementation ?? (() => {});
const unused = new Proxy({}, { get: () => () => unused });
export const expect = unused as any;
export const userEvent = unused as any;
export const fireEvent = unused as any;
export const within = unused as any;
export const waitFor = unused as any;
