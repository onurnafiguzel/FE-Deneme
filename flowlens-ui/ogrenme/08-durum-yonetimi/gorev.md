# 08 — Görevler

Hepsi `src/App.tsx`. Test etmek için `flowLensApi.ts`'teki `BASE_URL`'i geçici
olarak `/yok.json` yapıp geri alacaksın.

---

## Görev 1 — `error` state'i

`error` adında bir state ekle: tipi `string | null`, başlangıç `null`.

Effect'teki zinciri üç parçaya tamamla:

- `.then(...)` — mevcut hâli (veriyi yaz)
- `.catch(...)` — hata mesajını `error`'a yaz
- `.finally(...)` — `setIsLoading(false)`

`setIsLoading(false)`'ı `then` içinden **çıkar**, artık `finally`'nin işi.

`iptal` bayrağı kontrolünü üç dalda da uygula — component ekrandan kalktıysa
hiçbirinin state'e dokunmaması gerekiyor.

`catch` parametresinin tipi `unknown`; `ders.md`'deki narrowing'i uygula.

---

## Görev 2 — Hata ekranı

Render'daki koşul zincirine `error` dalını ekle. Sıra:

```
isLoading → error → (liste)
```

Hata kutusu class'ı:

```
rounded border border-red-900 bg-red-950/40 p-8 text-center text-sm text-red-300
```

İçinde hata mesajını göster.

Şu an render'da ternary kullanıyorsun. Üç dal olunca iç içe ternary okunmaz
hâle gelir — `ders.md`'deki gibi `return`'den önce erken çıkışlarla yazmayı
dene, ya da bu üç dalı ayrı bir değişkende hesapla. Hangisini seçersen seç,
karar gerekçeni bir yorum satırıyla yazma; sadece okunabilir olsun.

**Test:** `BASE_URL`'i `/yok.json` yap. Kırmızı kutuda `404` yazan bir mesaj
görmelisin (07'de `res.status`'u mesaja koyduğun için). Sonra geri al.

---

## Görev 3 — `Yenile` gerçekten yenilesin

`Yenile` butonu şu an sahte: sadece 800 ms bekliyor, veriyi tekrar çekmiyor.

`ders.md`'deki `reloadKey` kalıbını uygula:

1. `reloadKey` state'i ekle (başlangıç `0`)
2. effect'in dependency array'ine koy
3. butonun `onClick`'i `reloadKey`'i artırsın — güncelleyici fonksiyon biçimiyle
4. butondaki `setTimeout` ve `setIsLoading` çağrılarını **sil**

Effect'in başında `setIsLoading(true)` ve `setError(null)` yapmayı unutma —
ikinci denemede eski hata ekranda kalmasın.

**Test:** Network sekmesini aç, `Yenile`'ye bas, yeni bir `graph.json` isteği
gördüğünü doğrula.

---

## Görev 4 — Tekrar dene

Hata kutusuna bir buton koy, `Yenile` ile aynı işi yapsın (`reloadKey`'i
artırsın).

```
mt-4 rounded border border-red-800 px-3 py-2 text-xs hover:border-red-600
```

Aynı işi yapan iki buton oldu — ikisi de aynı fonksiyonu çağırsın, kodu
kopyalama.

---

## Kendine sor

Görev 3'te effect'in başına `setIsLoading(true)` koydun. Bu satır olmasaydı,
ikinci `Yenile`'de kullanıcı ne görürdü?

---

Bitince **"08 bitti"** de.
