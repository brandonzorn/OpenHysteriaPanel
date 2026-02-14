export type Color = "indigo" | "blue" | "emerald" | "cyan" | "green" | "yellow";


export const COLOR_CLASSES: Record<
    Color,
    { blurStyle: string; shadowStyle: string; textStyle: string }
> = {
    indigo: {
        textStyle: "text-indigo-400",
        blurStyle: "bg-indigo-500",
        shadowStyle: "shadow-[0_0_10px_rgba(99,102,241,0.5)]"
    },
    blue: {
        textStyle: "text-blue-400",
        blurStyle: "bg-blue-500",
        shadowStyle: "shadow-[0_0_10px_rgba(59,130,246,0.5)]"
    },
    emerald: {
        textStyle: "text-emerald-400",
        blurStyle: "bg-emerald-500",
        shadowStyle: "shadow-[0_0_10px_rgba(16,185,129,0.5)]"
    },
    cyan: {
        textStyle: "text-cyan-400",
        blurStyle: "bg-cyan-500",
        shadowStyle: "shadow-[0_0_10px_rgba(34,211,238,0.5)]"
    },
    green: {
        blurStyle: "bg-green-500",
        shadowStyle: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
        textStyle: "text-green-400",
    },
    yellow: {
        blurStyle: "bg-yellow-500",
        shadowStyle: "shadow-[0_0_10px_rgba(234,179,8,0.5)]",
        textStyle: "text-yellow-400",
    },
};