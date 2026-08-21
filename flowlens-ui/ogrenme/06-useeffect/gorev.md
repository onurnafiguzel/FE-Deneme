# 06 — Görevler

Şu ana kadar `endpoints`'i doğrudan `mockGraph.ts`'ten import ediyordun — veri
uygulama başlamadan hazırdı. Artık **sonradan gelecek**.

---

## Görev 1 — Veriyi state'e taşı

Dosya: `src/App.tsx`

1. `data` adında yeni bir state ekle. Tipi `EndpointSummary[]`, başlangıç değeri
   boş dizi. `useState` başlangıç değerinden tip çıkaramaz (boş dizi `never[]`
   olur), o yüzden generic'i elle ver:

   ```tsx
   const [data, setData] = useState<EndpointSummary[]>([])
   ```

2. `isLoading`'in başlangıç değerini `true` yap — uygulama açıldığında veri
   henüz yok.

3. `filteredEndpoints` artık import edilen `endpoints` yerine `data` üzerinden
   filtrelesin.

Bu adımdan sonra ekran boş kalacak (veriyi kimse yüklemiyor). Normal, sıradaki
görev onu çözüyor.

> `modules` importu kalabilir — modül listesi hâlâ sabit veriden geliyor.

---

## Görev 2 — Mock veriyi async yükle

`react`'ten `useEffect`'i import et.

`App` içinde bir effect kur (state tanımlarının altında, `return`'den önce):

- `setTimeout` ile 800 ms sonra `setData(endpoints)` ve `setIsLoading(false)`
- dependency array `[]` — sadece ilk açılışta
- **cleanup**: `clearTimeout`

Effect'in ilk satırına `console.log("effect çalıştı")`, cleanup'ın ilk satırına
`console.log("cleanup çalıştı")` koy.

Tarayıcı konsoluna bak: **kaç kez** çalıştı? `ders.md`'nin son bölümüyle
eşleştir. Bu iki log'u sonraki göreve kadar bırak.

---

## Görev 3 — Gerçek `fetch`

Artık ortada gerçek bir dosya var: `public/graph.json` — FlowLens'in ürettiği
`graph.json`'ın aynısı. Vite `public/` altındaki dosyaları kökten servis eder,
yani `/graph.json` adresinden erişilir.

Effect'in içini `setTimeout` yerine `fetch`'e çevir:

```tsx
fetch("/graph.json")
  .then((r) => r.json())
  .then((d) => { ... })
```

Gelen JSON'un yapısı `mockGraph` ile aynı: `{ generatedAt, solution, endpoints, graphs }`.
Sana lazım olan `d.endpoints`.

`endpoints` importunu artık silebilirsin.

**Şimdilik tip konusunu dert etme** — `r.json()` sana `any` verir. Bunu düzgün
tiplemek 07'nin konusu (typed API client).

Doğrulama: sayfayı yenile, kartlar bir gecikmeyle gelsin. Network sekmesinde
`graph.json` isteğini gör.

---

## Görev 4 — Yarış durumunu kapat

Effect'e `ders.md`'deki `iptal` (ignore) bayrağını ekle: cleanup bayrağı `true`
yapsın, `then` içindeki `setData`/`setIsLoading` yalnızca bayrak `false` iken
çalışsın.

Şu anki hâlde (`[]` deps) pratik bir yarış yok — ama 09'da endpoint detay
sayfasına geçtiğinde deps `[id]` olacak ve bu kalıp seni gerçek bir hatadan
koruyacak. Alışkanlığı şimdi kur.

Bitince Görev 2'deki `console.log`'ları temizle.

---

## Kendine sor

`Yenile` butonundaki `setTimeout`'u `useEffect`'e taşımalı mıydın? Neden hayır?

---

Bitince **"06 bitti"** de.
