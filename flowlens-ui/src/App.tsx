import { endpoints } from "./data/mockGraph"
import { EndpointList } from "./components/EndpointList"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Flowlens</h1>
      <p className="mb-6 text-sm text-slate-400">{endpoints.length} Endpoint</p>

      <EndpointList endpoints={endpoints} />

    </div>
  )
}
