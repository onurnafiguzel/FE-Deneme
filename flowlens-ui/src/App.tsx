import { endpoints, modules } from "./data/mockGraph";
import { EndpointList } from "./components/EndpointList";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("");
  const [module, setModule] = useState("");

  const filteredEndpoints = endpoints.filter(
    (x) =>
      (!query || x.path.toLowerCase().includes(query.toLowerCase())) &&
      (!method || x.method === method) &&
      (!module || x.module === module),
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Flowlens</h1>
      <p>{query}</p>
      <div className="flex gap-2 mb-6">
        <input
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="path ara..."
        />
        <select
          className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="">Tümü</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
        </select>
        <select
          className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
          value={module}
          onChange={(e) => setModule(e.target.value)}
        >
          <option value="">Tümü</option>
          {modules.map((module) => (
            <option value={module}>{module}</option>
          ))}
        </select>
        <button
          className="rounded border border-slate-700 px-3 py-2 text-sm hover:border-slate-500"
          onClick={() => setQuery("")}
        >
          Temizle
        </button>
      </div>
      <p className="mb-6 text-sm text-slate-400">
        {filteredEndpoints.length} Endpoint{" "}
      </p>
      <EndpointList endpoints={filteredEndpoints} />
    </div>
  );
}
