# 02 — Egzersizler

`cozum.ts` içine yaz. Çalıştırma: `npm run 02` — Tip kontrolü: `npm run check`

---

## Egzersiz 1 — literal union

`OrderStatus` tipini tanımla: `"pending"`, `"paid"`, `"shipped"`, `"cancelled"`.

`statusLabel(status: OrderStatus): string` fonksiyonu yaz, her durum için Türkçe bir
etiket dönsün ("Ödeme bekliyor", "Ödendi" gibi). `switch` kullan.

Dört durumu da çağırıp bas.

Sonra `statusLabel("delivered")` yazmayı dene. Aldığın hata mesajını yorum satırı olarak
dosyaya kopyala, sonra satırı sil ya da `@ts-expect-error` ile işaretle.

---

## Egzersiz 2 — union üzerinde ortak üyeler

`ProductId` tipini `number | string` olarak tanımla.

`formatProductId(id: ProductId): string` fonksiyonu yaz:
- `id` string ise büyük harfe çevirip dönsün (`"abc-1"` → `"ABC-1"`)
- `id` number ise başına `#` koyup dönsün (`101` → `"#101"`)

Fonksiyonun içinde, `typeof` kontrolünü yazmadan **önce** `id.toUpperCase()` çağırmayı
dene ve hatayı gör. Neden hata verdiğini bir yorum satırıyla yaz.

Sonra `typeof` ile daralt ve doğru çalışan halini bırak. İki tipten de birer örnekle çağır.

---

## Egzersiz 3 — discriminated union

Bir ürün detay isteğinin sonucunu modelleyen `ProductResponse` tipini yaz. Üç durumu olsun:

| durum | alanlar |
|---|---|
| `"loading"` | (ek alan yok) |
| `"success"` | `data: Product` |
| `"error"` | `message: string`, `statusCode: number` |

Ayırt edici alanın adı `status` olsun. `Product` tipini de tanımla
(`id: number`, `name: string`, `price: number` yeter).

`renderResponse(res: ProductResponse): string` fonksiyonu yaz, `switch (res.status)` ile
her durum için farklı bir metin dönsün. Üç durumdan da birer nesne oluşturup çağır.

`case "loading"` bloğunun içinde `res.data` yazmayı dene — hatayı gör, sonra sil.

---

## Egzersiz 4 — exhaustiveness

Egzersiz 3'teki `renderResponse` fonksiyonuna `default` dalı ekle ve içinde `never`
atamasını yap (ders.md'deki numara).

Sonra `ProductResponse`'a dördüncü bir durum ekle:

```
| { status: "empty" }
```

`switch`'e dokunma ve `npm run check` çalıştır. Derleyicinin nerede ve ne dediğini yorum
satırı olarak yaz. Sonra eksik `case`'i ekleyip hatayı gider.

Son olarak yorum satırı olarak cevapla: Bu kontrolü C#'ta yazsaydın hatayı ne zaman
öğrenirdin?
