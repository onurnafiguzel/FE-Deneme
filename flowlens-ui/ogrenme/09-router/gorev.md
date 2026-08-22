# 09 — Görevler

`react-router-dom` kuruldu (v7). İki boş sayfa iskeleti hazır:
`src/pages/EndpointsPage.tsx` ve `src/pages/EndpointDetailPage.tsx`.

Bu konu 5 görev — çünkü ilki tamamen mekanik.

---

## Görev 1 — Mevcut ekranı sayfaya taşı (mekanik)

`App.tsx`'in **tüm içeriğini** (state'ler, effect, handler'lar, `icerik`
zinciri, `return`) `EndpointsPage.tsx`'e taşı.

- Fonksiyon adı `EndpointsPage` olsun, `export function` ile dışa ver
  (`export default` değil)
- Import'ları da taşı, yollar bir seviye derinleştiği için `./` → `../` olacak
- Dış `<div>`'deki `min-h-screen ... p-8` class'ı kalsın

`App.tsx` şimdilik boşalacak, sonraki görev onu dolduruyor.

Yeni kavram yok. Kes-yapıştır + import yollarını düzeltmek.

---

## Görev 2 — Router'ı kur

`App.tsx` artık sadece yönlendirme yapacak. `ders.md`'deki üç parçayı kur:

- `BrowserRouter`
- `Routes`
- iki `Route`: `/` → `EndpointsPage`, `/endpoints/:id` → `EndpointDetailPage`

Hepsi `react-router-dom`'dan import edilir.

`EndpointDetailPage` şu an boş — geçici olarak içine tek satırlık bir
`<p>detay</p>` koy ki route'un çalıştığını görebilesin.

**Test:** adres çubuğuna elle `/endpoints/test` yaz, "detay" yazısını gör.

---

## Görev 3 — Kartları tıklanabilir yap

Dosya: `src/components/EndpointCard.tsx`

1. `EndpointCardProps`'a `id: string` ekle. (Spread sayesinde `EndpointList`'te
   bir şey değişmeyecek — 02'de gördüğün davranış.)
2. Kartın tamamını bir `<Link>` ile sar, hedef: `/endpoints/{id}`

`<Link>` için class:

```
block
```

`ders.md`'de yazdığım gibi `<a href>` kullanma — nedenini orada anlattım.

**Test:** bir karta tıkla, adres değişsin, sayfa **yeniden yüklenmesin**
(Network sekmesinde yeni bir belge isteği olmamalı). Geri tuşu listeye
dönmeli.

---

## Görev 4 — API'ye tek endpoint sorgusu ekle

Dosya: `src/api/flowLensApi.ts`

Üçüncü bir fonksiyon yaz:

```ts
export async function fetchEndpointDetail(id: string)
```

Dönüşü şu iki şeyi birlikte versin: endpoint'in kendisi (`EndpointSummary`) ve
grafiği (`EndpointGraph`). Dönüş tipini elle yaz.

- `fetchGraph()`'i çağır (tekrar `fetch` yazma)
- `graph.endpoints` içinden `id`'ye uyanı bul, `graph.graphs` içinden
  `endpointId`'si uyanı bul
- ikisinden biri yoksa? **Burada karar senin.** `null` döndürmek mi, `throw`
  etmek mi? 08'deki "hata mı, bulunamadı mı" ayrımını hatırla: bulunamamak bir
  hata değil, geçerli bir sonuç. Seçimini yap ve dönüş tipine yansıt.

---

## Görev 5 — Detay sayfası

Dosya: `src/pages/EndpointDetailPage.tsx`

`useParams` ile `id`'yi oku (tipi `string | undefined`, ele al).

06-08'de kurduğun kalıbın aynısı: effect + `iptal` bayrağı + loading/error/
not-found/success zinciri. Bu sefer deps `[id]` olacak — kullanıcı bir detaydan
başka bir detaya geçerse veri yeniden çekilmeli.

Ekranda göster:

- endpoint'in method + path'i (üstte, `EndpointCard`'daki gibi)
- düğüm listesi: her düğümün `label`, `kind`, `module` bilgisi
- kenar listesi: `from → to (kind)`

Sayfanın en üstüne listeye dönüş bağlantısı koy: `<Link to="/">← Liste</Link>`

Class'lar:

```
sayfa:      min-h-screen bg-slate-950 text-slate-100 p-8
geri linki: text-sm text-slate-400 hover:text-slate-200
başlık:     mt-4 mb-6 font-mono text-lg
bölüm adı:  mt-6 mb-2 text-sm font-semibold text-slate-400
satır:      rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-mono
liste:      space-y-2
```

Düğüm ve kenar listelerinde `key` gerekiyor — düğümde `id` var, kenarda yok.
Kenar için ne kullanacaksın? 02'deki kuralı hatırla, indeks son çare.

---

## Kendine sor

Detay sayfasında da `fetchGraph()` çağrılıyor, yani `graph.json` ikinci kez
indiriliyor. Bu bir sorun mu? Nasıl çözerdin?

(Cevabın bir kısmı 11'de: `useEndpoints()` hook'u.)

---

Bitince **"09 bitti"** de.
