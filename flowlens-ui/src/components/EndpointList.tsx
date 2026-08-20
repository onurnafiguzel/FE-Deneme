import type { EndpointSummary } from "../data/mockGraph"
import { EndpointCard } from "./EndpointCard"

interface EndpointListProps {
    endpoints: EndpointSummary[]
}

export function EndpointList({ endpoints }: EndpointListProps) {
    return (
        <div className="space-y-3">
            {endpoints.map((e) => (
                <EndpointCard key={e.id} {...e} />
            ))}
        </div>
    )
}
