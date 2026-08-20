import type { HttpMethod } from "../data/mockGraph"

interface EndpointCardProps {
    method: HttpMethod
    path: string
    module: string
    filePath: string
}

export function EndpointCard({ method, path, module, filePath }: EndpointCardProps) {

    let methodColour;

    switch (method){
        case "GET":    methodColour = "bg-emerald-700"; break; 
        case "POST":   methodColour = "bg-blue-700"; break;
        case "PUT":    methodColour = "bg-amber-700"; break;
        case "PATCH":  methodColour = "bg-amber-700"; break;
        case "DELETE": methodColour = "bg-red-700" ; break;
    }
    
    return (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 hover:border-slate-500">
            <div className="flex items-center gap-3">
                <span className={`rounded px-2 py-0.5 text-xs font-bold text-slate-100 ${methodColour}`}>
                    {method}
                </span>
                <span className="font-mono text-sm text-slate-100">
                    {path}
                </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{module}</p>
            <p className="mt-1 font-mono text-[11px] text-slate-500">{filePath}</p>
        </div>
    )
}
