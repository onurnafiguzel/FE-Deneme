# 05 — Görevler

Adımlar küçük. Her birinden sonra tarayıcıya bak.

---

## Görev 1 — "Kayıt bulunamadı" (EndpointList içinde)

Dosya: `src/components/EndpointList.tsx`

Arama kutusuna `zzz` yaz — şu an ekran bomboş kalıyor, kullanıcı filtrenin mi
çalıştığını yoksa uygulamanın mı bozulduğunu anlayamıyor.

`EndpointList`, dizisi boşsa bunun yerine bir mesaj göstersin. `ders.md`'deki
üçüncü kalıbı kullan: `return`'den önce bir guard clause.

Class:

```
rounded border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500
```

Metin: `Kayıt bulunamadı`

**Neden `App.tsx`'te değil de burada?** Listeyi çizmek `EndpointList`'in işi;
"çizecek bir şey yok" durumu da onun işi. `App` sadece hangi diziyi vereceğine
karar verir. Backend'de repository'nin boş liste döndürmesi ile controller'ın
404 üretmesi arasındaki sorumluluk ayrımı gibi.

---

## Görev 2 — `0` tuzağını kendi gözünle gör

`App.tsx`'teki sayaç `<p>`'sini geçici olarak şuna çevir:

```tsx
{filteredEndpoints.length && <span>{filteredEndpoints.length} Endpoint</span>}
```

`zzz` ara. Ekranda ne görüyorsun? `ders.md`'deki açıklamayla eşleştir.

Sonra düzelt: sayaç yalnızca **sonuç varken** görünsün, boşken hiçbir şey
yazmasın — ama ekranda `0` da kalmasın.

---

## Görev 3 — Yükleniyor durumu

Dosya: `src/App.tsx`

Gerçek veri çekmiyoruz (o 06'da), ama yüklenme hâlini şimdiden kuralım.

1. `isLoading` adında bir boolean state ekle, başlangıç `false`.
2. `Temizle`'nin yanına `Yenile` butonu koy. Tıklanınca:
   - `isLoading`'i `true` yap
   - `setTimeout(..., 800)` ile 800 ms sonra tekrar `false` yap

   ```tsx
   setTimeout(() => setIsLoading(false), 800)
   ```

   Bunu doğrudan `onClick` handler'ının içine yaz. (Neden `useEffect`
   gerekmediğini 06'da konuşacağız: bu bir olaya tepki, bir yan etki değil.)
3. `isLoading` true iken `EndpointList` yerine bir yükleniyor mesajı göster.
   Sayaç `<p>`'si de yükleniyorken görünmesin.

Yükleniyor kutusu için:

```
rounded border border-slate-800 p-8 text-center text-sm text-slate-500
```

Metin: `Yükleniyor...`

**Dikkat:** `ders.md`'deki durum sırasına uy. Yükleniyorken "Kayıt bulunamadı"
görünmemeli — bunu test et, `Yenile`'ye basıp 800 ms içinde ne göründüğüne bak.

---

## Görev 4 — Butonu kilitle

`Yenile` butonuna `disabled={isLoading}` ekle. Yükleniyorken üst üste
tıklanmasın.

Devre dışı görünüm için class'ın sonuna ekle:

```
disabled:opacity-50
```

---

## Kendine sor

Görev 3'te `isLoading` state'ini `App`'e koydun. `EndpointList`'in içine
koysaydın ne olurdu, `Yenile` butonu ona nasıl haber verirdi?

(Cevabı 10. konuda — "lifting state up" tam olarak bu sorunun adı.)

---

Bitince **"05 bitti"** de.
