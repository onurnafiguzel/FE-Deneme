import { endpoints } from "./data/mockGraph";
import { EndpointList } from "./components/EndpointList";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const filteredEndpoints = query
    ? endpoints.filter((x) => x.module.toLowerCase() === query.toLowerCase())
    : endpoints;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Flowlens</h1>
      <p>{query}</p>
      <input
        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="path ara..."
      ></input>
      <p className="mb-6 text-sm text-slate-400">
        {
          endpoints.filter(
            (x) => x.module.toLowerCase() === query.toLowerCase(),
          ).length
        }{" "}
        Endpoint
      </p>

      <EndpointList endpoints={filteredEndpoints} />
    </div>
  );
}
