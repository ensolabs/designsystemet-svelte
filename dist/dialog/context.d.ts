/** What Dialog.TriggerContext shares, as React's dialog `Context`: the dialog element, for Dialog.Trigger to open. */
export type DialogContext = {
    current: HTMLDialogElement | null;
};
export declare const setDialogContext: (context: DialogContext) => DialogContext;
export declare const getDialogContext: () => DialogContext;
