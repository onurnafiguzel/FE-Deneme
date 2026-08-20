interface ModuleBadgeProps {
    module: string
}

const COLOURS: Record<string, string> = {
    Orders: "bg-indigo-800",
    Payments: "bg-teal-800",
    Catalog: "bg-fuchsia-800",
    Identity: "bg-cyan-800",
    Shipping: "bg-orange-800",
    Notifications: "bg-lime-800",
}

export function ModuleBadge({ module }: ModuleBadgeProps) {
    return (
        <span className={`rounded px-2 py-0.5 text-xs ${COLOURS[module] ?? "bg-slate-700"}`}>
            {module}
        </span>
    )
}
