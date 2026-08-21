# 07 — Typed API Client

## Problem: `any` sızıntısı

06'da yazdığın satır:

```tsx
.then((d) => setData(d.endpoints))
```

`r.json()` dönüş tipi `any`. Yani `d.endpoints`, `d.endpointz`, `d.foo.bar.baz`
— hepsi derlenir. TypeScript'i açtın ama uygulamanın **veri giriş kapısında**
kapalı. `any` bulaşıcıdır: bir yerden girer, dokunduğu her değişkeni kontrolsüz
bırakır.

Çözüm mimari: dış dünyayla konuşan tek bir katman olsun, tipleme orada bir kez
yapılsın, geri kalan uygulama sadece tiplenmiş veri görsün.

Backend karşılığı doğrudan **repository pattern**. Component'ler `fetch`
bilmesin, tıpkı handler'ların `DbContext` bilmemesi gibi. URL, HTTP metodu,
başlıklar, hata çevirisi — hepsi tek dosyada.

## Katmanlar

```
types.ts        → DTO'lar (veri şekli)
flowLensApi.ts  → repository (nasıl alınır)
App.tsx         → tüketici (ne gösterilir)
```

Bunun pratik faydası: yarın `graph.json` yerine `https://api/flowlens/graph`
kullanacaksan tek dosya değişir. Component'lerin haberi bile olmaz.

## `res.ok` — sessiz hata

`fetch` çok yanıltıcı bir davranışa sahip: **404 veya 500 hata sayılmaz.**
Promise başarıyla çözülür, sadece `res.ok` `false` olur.

```ts
const res = await fetch(url)
if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
```

Bunu yazmazsan sunucunun döndürdüğü HTML hata sayfasını JSON diye ayrıştırmaya
çalışır ve alakasız bir hata alırsın. `catch` yalnızca ağ tamamen çöktüğünde
(DNS, bağlantı kesildi, CORS) tetiklenir.

C#'taki karşılığı `EnsureSuccessStatusCode()`. `HttpClient` de aynı şekilde
davranır — hata kodunda exception atmaz, sen sormalısın.

## `as` bir söz, kanıt değil

```ts
const data = (await res.json()) as FlowLensGraph
```

Bu satır TypeScript'e "bana güven, bu veri şu şekilde" der. **Hiçbir çalışma
zamanı kontrolü yapmaz.** Sunucu bambaşka bir şey döndürse de derleyici susar,
uygulama ilerideki bir satırda patlar.

Yine de doğru yaklaşım bu — çünkü tek bir yerde, bilinçli olarak yapıyorsun.
Alternatifi (zod gibi bir şema doğrulayıcı ile çalışma zamanında doğrulamak)
gerçek projede değerlidir, ama şu an konumuz değil. Önemli olan **nerede yalan
söylediğini bilmek**: `as` yazdığın satır, uygulamanın tip güvenliğinin bittiği
tek nokta olsun.

## `async/await` vs `.then`

API katmanında `async/await` kullan — zaten bildiğin sözdizimi, okuması kolay:

```ts
export async function fetchGraph(): Promise<FlowLensGraph> {
  const res = await fetch(GRAPH_URL)
  if (!res.ok) throw new Error(...)
  return (await res.json()) as FlowLensGraph
}
```

Component tarafında ise effect'in kendisi `async` **olamaz** (06'da konuştuk).
Orada ya `.then` zinciri kurarsın, ya effect'in içinde bir async fonksiyon
tanımlayıp hemen çağırırsın.

Dönüş tipini elle yazmayı ihmal etme (`: Promise<FlowLensGraph>`). Yazmazsan
inference `Promise<any>` üretir ve az önce kapattığın deliği geri açarsın.
