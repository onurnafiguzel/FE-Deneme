import { endpoints, modules, type EndpointSummary } from "./data/mockGraph";
import { EndpointList } from "./components/EndpointList";
import { useState, type ChangeEvent } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("");
  const [module, setModule] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EndpointSummary[]>([]);

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleMethodChange(e: ChangeEvent<HTMLSelectElement>) {
    setMethod(e.target.value);
  }

  function handleModuleChange(e: ChangeEvent<HTMLSelectElement>) {
    setModule(e.target.value);
  }

  function handleClear() {
    setQuery("");
    setMethod("");
    setModule("");
  }

  const filteredEndpoints = data.filter(
    (x) =>
      (!query || x.path.toLowerCase().includes(query.toLowerCase())) &&
      (!method || x.method === method) &&
      (!module || x.module === module),
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Flowlens</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
          value={query}
          onChange={handleQueryChange}
          placeholder="path ara..."
        />
        <select
          className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
          value={method}
          onChange={handleMethodChange}
        >
          <option value="">Tümü</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <select
          className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
          value={module}
          onChange={handleModuleChange}
        >
          <option value="">Tümü</option>
          {modules.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          className="rounded border border-slate-700 px-3 py-2 text-sm hover:border-slate-500"
          onClick={handleClear}
        >
          Temizle
        </button>
        <button
          className="rounded border border-slate-700 px-3 py-2 text-sm hover:border-slate-500 disabled:opacity-50" disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 800);
          }}
        >
          Yenile
        </button>
      </div>
      {isLoading ? (
        <p className="rounded border border-slate-800 p-8 text-center text-sm text-slate-500">
          Yükleniyor...
        </p>
      ) : (
        <>
          <p className="mb-6 text-sm text-slate-400">
            {filteredEndpoints.length > 0 && (
              <span>{filteredEndpoints.length} Endpoint</span>
            )}
          </p>
          <EndpointList endpoints={filteredEndpoints} />
        </>
      )}
    </div>
  );
}
