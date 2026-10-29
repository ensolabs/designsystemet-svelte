/** What a ToggleGroup tells its items, as React's `ToggleGroupContext`. */
export type ToggleGroupContext = {
    readonly defaultValue?: string;
    readonly name?: string;
    readonly value?: string;
    readonly variant?: 'primary' | 'secondary';
    onChange?: (value: string) => void;
};
export declare const setToggleGroup: (context: ToggleGroupContext) => ToggleGroupContext;
export declare const getToggleGroup: () => ToggleGroupContext;
