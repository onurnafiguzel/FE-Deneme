# 03 — Görevler

Hepsi `src/App.tsx` içinde. Küçük adım, her adımda tarayıcıya bak.

---

## Görev 1 — State'i kur ve ekrana yaz

`react`'ten `useState`'i import et:

```tsx
import { useState } from "react"
```

`App` fonksiyonunun **ilk satırında** (return'den önce, koşulsuz) bir state
tanımla: `query`, başlangıç değeri boş string.

Şimdilik sadece ekrana bas — başlığın altına `{query}` yazdıran bir `<p>` koy.
Boş görünecek, normal. Amaç bağlantıyı kurmak.

---

## Görev 2 — Arama kutusu

Başlığın altına bir `<input>` ekle. İki şey bağlayacaksın:

- `value={query}` — kutuda ne yazacağını **state belirler**
- `onChange={...}` — kullanıcı yazınca **state'i güncelle**

`onChange`'e verdiğin fonksiyon bir olay (event) objesi alır; yazılan metin
`event.target.value` içindedir. Bu fonksiyonu ok fonksiyonu olarak inline yaz.

Class:

```
w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-slate-500
```

`placeholder="path ara..."` da ekle.

Doğrulama: yazdıkça Görev 1'deki `<p>` anlık güncellenmeli. Güncellenmiyorsa
`onChange` bağlı değildir — kutuya hiç yazı da giremiyorsan `value` bağlanmış
ama `onChange` yok demektir (React inputu state'e kilitler).

---

## Görev 3 — Filtreleme

`query`'ye göre filtrelenmiş bir dizi hesapla ve `EndpointList`'e onu geç.

- `path` içinde arama yap
- Büyük/küçük harf duyarsız olsun (iki tarafı da `toLowerCase()`)
- `query` boşken hepsi görünsün — `includes("")` her zaman `true` döndürür,
  ayrıca `if` yazmana gerek yok

Bunu **state'te tutma**. `ders.md`'nin son bölümü tam olarak bunu anlatıyor:
`const filtered = ...` diye normal bir değişken olacak, `useState` ile değil.

Sayaç `<p>`'sini de güncelle: toplam yerine kaç sonuç bulunduğunu göstersin.

Tekrar egzersizinde eklediğin sabit "Orders endpoints" bölümünü artık silebilirsin.

---

## Görev 4 — Temizle butonu

Arama kutusunun yanına bir `<button>` koy, tıklanınca `query`'yi sıfırlasın.

```
rounded border border-slate-700 px-3 py-2 text-sm hover:border-slate-500
```

Input ve butonu yan yana dizmek için ikisini şu class'a sahip bir `div`'e al:

```
flex gap-2 mb-6
```

`onClick` de `onChange` gibi çalışır, sadece olay objesine ihtiyacın yok.

---

## Kendine sor (kod yazma, sadece cevapla)

`setQuery(e.target.value)` satırının hemen altına `console.log(query)` koysan
ne yazar — yeni değer mi, eski değer mi? Neden?

---

Bitince **"03 bitti"** de.
