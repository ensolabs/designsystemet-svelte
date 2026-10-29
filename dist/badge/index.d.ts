import BadgePosition from './BadgePosition.svelte';
declare const Badge: import("svelte").Component<import("..").DefaultProps & Omit<import("svelte/elements").HTMLAttributes<HTMLSpanElement>, "children"> & {
    count?: number;
    maxCount?: number;
    variant?: "base" | "tinted";
    ref?: HTMLSpanElement;
}, {}, "ref"> & {
    Position: import("svelte").Component<import("..").DefaultProps & import("svelte/elements").HTMLAttributes<HTMLSpanElement> & {
        placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        overlap?: "circle" | "rectangle";
        ref?: HTMLSpanElement;
    }, {}, "ref">;
};
export { Badge, BadgePosition };
