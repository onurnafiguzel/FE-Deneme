import type { EndpointSummary } from "../data/mockGraph";
import { EndpointCard } from "./EndpointCard";

interface EndpointListProps {
  endpoints: EndpointSummary[];
}

export function EndpointList({ endpoints }: EndpointListProps) {
  if (endpoints.length === 0) {
    return (
      <p
        className="rounded border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500"
      >
        Kayıt bulunamadı
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {endpoints.map((e) => (
        <EndpointCard key={e.id} {...e} />
      ))}
    </div>
  );
}
