# 04 — Görevler

Yine `src/App.tsx`. Ortak class'lar:

```
select:  rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500
```

Üç filtreyi aynı `flex gap-2 mb-6` satırına koy, input'un yanına.

---

## Görev 1 — Method filtresi

`method` adında ikinci bir state ekle (başlangıç: `""`).

Yanına bir `<select>` koy. Seçenekler: `Tümü` (value `""`), `GET`, `POST`,
`PUT`, `PATCH`, `DELETE`. Bunları elle tek tek `<option>` olarak yaz.

Filtreye ekle: `method` boşsa method kuralını uygulama, doluysa yalnızca o
method'un endpoint'leri kalsın.

---

## Görev 2 — Modül filtresi

`module` adında üçüncü bir state ekle.

Bu seferki `<select>`'in seçeneklerini **elle yazma**. `mockGraph.ts` zaten
benzersiz modül listesini dışa veriyor:

```tsx
import { modules } from "./data/mockGraph"
```

`Tümü` seçeneğini elle yaz, kalanını `modules` üzerinden `map` ile üret.
`key` gerekiyor — 02'deki kural burada da geçerli, `option` da bir element.

Filtreye ekle.

---

## Görev 3 — Handler'ı dışarı çıkar

Method `<select>`'inin `onChange`'ini inline ok fonksiyonu olmaktan çıkar,
`App`'in içinde adlandırılmış bir fonksiyona taşı:

```tsx
function handleMethodChange(e: React.ChangeEvent<HTMLSelectElement>) { ... }
```

Sonra `onChange={handleMethodChange}` diye bağla.

**Dikkat:** `onChange={handleMethodChange()}` yazma. Parantez koyarsan fonksiyonu
render sırasında **çağırmış** olursun ve React'e dönüş değerini verirsin — 02'de
`EndpointCard({...})` yazarken düştüğün tuzağın aynısı. React'e fonksiyonun
**kendisini** vereceksin.

---

## Görev 4 — Temizle hepsini sıfırlasın

Buton üç state'i birden sıfırlasın. Üç ayrı `setX` çağırmaktan çekinme —
`ders.md`'de yazdığım gibi React bunları tek render'da topluyor.

---

## Kendine sor

Üç filtreyi de doldurdun, sonra `Temizle`'ye bastın. React kaç kez render etti?
Emin değilsen `App`'in ilk satırına `console.log("render")` koy ve konsola bak.

---

Bitince **"04 bitti"** de.
