/**
 * FlowLens API'sinin döndürdüğü veri tipleri.
 * Backend karşılığı: response DTO'ları. Tek tanım yeri burası;
 * hem mock veri hem gerçek API katmanı bu tipleri kullanır.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/** Bir düğümün mimarideki rolü. */
export type NodeKind =
  | 'controller'
  | 'service'
  | 'repository'
  | 'publisher'
  | 'consumer'
  | 'external'

/** İki düğüm arasındaki ilişkinin türü. */
export type EdgeKind =
  | 'call' // doğrudan metot çağrısı (Roslyn call graph)
  | 'publish' // message bus'a event/command basma
  | 'consume' // handler'ın mesajı tüketmesi
  | 'http' // dış servise HTTP çağrısı
  | 'db' // veritabanı erişimi

export interface EndpointSummary {
  /** Kararlı kimlik — route + method'dan üretilmiş gibi düşün. */
  id: string
  method: HttpMethod
  path: string
  /** Endpoint'in ait olduğu modül / bounded context. */
  module: string
  /** Handler metodun bulunduğu kaynak dosya. */
  filePath: string
  /** `Type.Method` formatında giriş noktası. */
  handler: string
}

export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  module: string
  filePath: string
}

export interface GraphEdge {
  from: string
  to: string
  kind: EdgeKind
  /** Kenarın kaynağındaki çağrı satırı (varsa). */
  line?: number
}

export interface EndpointGraph {
  endpointId: string
  nodes: GraphNode[]
  edges: GraphEdge[]
}

/** FlowLens çıktısının tamamı. */
export interface FlowLensGraph {
  generatedAt: string
  solution: string
  endpoints: EndpointSummary[]
  graphs: EndpointGraph[]
}
