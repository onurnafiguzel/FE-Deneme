import { endpoints } from "./data/mockGraph"
import { EndpointCard } from "./components/EndpointCard"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-3">
      <h1 className="text-2xl font-bold mb-6">FlowLens</h1>

      <EndpointCard method={endpoints[0].method} filePath={endpoints[0].filePath} module={endpoints[0].module} path={endpoints[0].path} />

      <EndpointCard method={endpoints[1].method} filePath={endpoints[1].filePath} module={endpoints[1].module} path={endpoints[1].path} />
      
      <EndpointCard method={endpoints[3].method} filePath={endpoints[3].filePath} module={endpoints[3].module} path={endpoints[3].path} />
    </div>
  )
}
