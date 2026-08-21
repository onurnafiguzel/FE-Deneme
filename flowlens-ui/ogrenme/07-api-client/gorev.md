# 07 — Görevler

Bu konu için dosya düzenini hazırladım:

- **`src/api/types.ts`** — DTO'lar buraya taşındı (`EndpointSummary`,
  `EndpointGraph`, `FlowLensGraph` ...). Önce bu dosyaya bir göz at.
- **`src/api/flowLensApi.ts`** — repository katmanı, iskeleti hazır. Senin
  yazacağın dosya bu.
- `src/data/mockGraph.ts` artık tip tanımlamıyor, `types.ts`'ten alıp yeniden
  dışa veriyor. Mevcut import'ların çalışmaya devam ediyor.

---

## Görev 1 — `fetchGraph()`

Dosya: `src/api/flowLensApi.ts`

Tüm `graph.json`'ı çeken fonksiyonu yaz:

- `async` olsun
- dönüş tipini **elle** yaz: `Promise<FlowLensGraph>`
- `res.ok` kontrolü yap, değilse `throw new Error(...)` — mesajda `res.status`
  geçsin
- gövdeyi `as FlowLensGraph` ile tiplendir

URL'i dosyanın üstünde bir sabite al:

```ts
const BASE_URL = "/graph.json"
```

Gerçek API'ye geçince değişecek tek satır bu olsun.

---

## Görev 2 — `fetchEndpoints()`

`App`'in ihtiyacı olan tüm graph değil, sadece endpoint listesi. İkinci bir
fonksiyon yaz: `fetchGraph()`'i çağırsın, `Promise<EndpointSummary[]>`
döndürsün.

Component'in "graph.json'un içinde endpoints diye bir alan var" bilgisini
taşımasına gerek yok — bu, deponun iç detayı.

---

## Görev 3 — `App.tsx`'i temizle

Effect'in içindeki `fetch` zincirini sil, yerine `fetchEndpoints()` kullan.
Yarış durumu bayrağını (`iptal`) **koru** — o bir API detayı değil, component'in
yaşam döngüsüne ait.

```tsx
fetchEndpoints().then((list) => {
  if (!iptal) { ... }
})
```

Bittiğinde `App.tsx` içinde `fetch` kelimesi geçmemeli. `EndpointSummary`
tipini de artık `../api/types`'tan import et, `mockGraph`'tan değil.

---

## Görev 4 — Hatayı gör

Geçici olarak `BASE_URL`'i `/yok.json` yap ve sayfayı yenile.

1. Konsolda ne görüyorsun? `Uncaught (in promise) Error: ...` — çünkü `throw`
   ettiğin hatayı kimse yakalamıyor.
2. Ekranda ne oluyor? `setIsLoading(false)` hiç çalışmadığı için sonsuza kadar
   "Yükleniyor..." — kullanıcı ne olduğunu asla anlamıyor.

Bu tam olarak 08'in konusu. Şimdilik `BASE_URL`'i geri al ve gördüğünü aklında
tut: **hata durumunu yönetmemek, hatayı gizlemek demek.**

---

## Kendine sor

`fetchEndpoints()` içinde `res.ok` kontrolünü neden tekrar yazmadın?

---

Bitince **"07 bitti"** de.
