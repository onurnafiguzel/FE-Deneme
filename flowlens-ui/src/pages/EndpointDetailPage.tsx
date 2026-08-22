import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEndpointDetail, type EndpointDetail } from "../api/flowLensApi";

export function EndpointDetailPage() {
  const { id } = useParams();

  const [detail, setDetail] = useState<EndpointDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let iptal = false;
    setIsLoading(true);
    setError(null);

    if (!id) {
      setDetail(null);
      setIsLoading(false);
      return;
    }

    fetchEndpointDetail(id)
      .then((result) => {
        if (!iptal) {
          setDetail(result);
        }
      })
      .catch((err) => {
        if (!iptal) {
          setError(err instanceof Error ? err.message : "Bilinmeyen hata");
        }
      })
      .finally(() => {
        if (!iptal) {
          setIsLoading(false);
        }
      });

    return () => {
      iptal = true;
    };
  }, [id]);

  let icerik;
  if (isLoading) {
    icerik = (
      <p className="rounded border border-slate-800 p-8 text-center text-sm text-slate-500">
        Yükleniyor...
      </p>
    );
  } else if (error) {
    icerik = (
      <p className="rounded border border-red-900 bg-red-950/40 p-8 text-center text-sm text-red-300">
        {error}
      </p>
    );
  } else if (!detail) {
    icerik = (
      <p className="rounded border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
        Endpoint bulunamadı: {id}
      </p>
    );
  } else {
    icerik = (
      <>
        <h1 className="mt-4 mb-6 font-mono text-lg">
          {detail.summary.method} {detail.summary.path}
        </h1>

        <h2 className="mt-6 mb-2 text-sm font-semibold text-slate-400">
          Düğümler
        </h2>
        <div className="space-y-2">
          {detail.graph.nodes.map((n) => (
            <div
              key={n.id}
              className="rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-mono"
            >
              {n.label} — {n.kind} / {n.module}
            </div>
          ))}
        </div>

        <h2 className="mt-6 mb-2 text-sm font-semibold text-slate-400">
          Kenarlar
        </h2>
        <div className="space-y-2">
          {detail.graph.edges.map((e) => (
            <div
              key={`${e.from}->${e.to}:${e.kind}`}
              className="rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-mono"
            >
              {e.from} → {e.to} ({e.kind})
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <Link to="/" className="text-sm text-slate-400 hover:text-slate-200">
        ← Liste
      </Link>
      {icerik}
    </div>
  );
}
