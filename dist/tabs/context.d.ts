/** What Tabs shares with its tabs and panels, as React's tabs `Context`. */
export type TabsContext = {
    readonly isControlled: boolean;
    readonly currentValue: string | undefined;
    onChange?: (value: string) => void;
    getPrefixedValue?: (value: string) => string;
};
export declare const setTabsContext: (context: TabsContext) => TabsContext;
export declare const getTabsContext: () => Partial<TabsContext>;
