import type { EndpointGraph, EndpointSummary, FlowLensGraph } from "./types";

const BASE_URL = "/graph.json";

export async function fetchGraph(): Promise<FlowLensGraph> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Graph yüklenemedi: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as FlowLensGraph;
}

export async function fetchEndpoints(): Promise<EndpointSummary[]> {
  const graph = await fetchGraph();
  return graph.endpoints;
}

export interface EndpointDetail {
  summary: EndpointSummary;
  graph: EndpointGraph;
}

export async function fetchEndpointDetail(
  id: string,
): Promise<EndpointDetail | null> {
  const result = await fetchGraph();

  const summary = result.endpoints.find((x) => x.id === id);
  const graph = result.graphs.find((g) => g.endpointId === id);

  if (!summary || !graph) {
    return null;
  }

  return { summary, graph };
}
