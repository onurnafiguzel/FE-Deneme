import type { EndpointSummary, FlowLensGraph } from "./types";

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
