# 03 — Egzersizler

`cozum.ts` içine yaz. Çalıştırma: `npm run 03` — Tip kontrolü: `npm run check`

Önce bu iki tipi tanımla, egzersizlerde kullanacaksın:

```
Product  -> id: number, name: string, price: number
Customer -> id: number, fullName: string, email: string
```

Birer de dizi hazırla: `products` (en az 3 ürün), `customers` (en az 2 müşteri).

---

## Egzersiz 1 — generic fonksiyon ve tip çıkarımı

`first<T>(items: T[]): T | undefined` yaz — dizinin ilk elemanını dönsün, dizi boşsa
`undefined`.

Üç kez çağır: `products`, `customers` ve `[10, 20, 30]` ile. Hiçbirinde `<...>` yazma.

Her çağrının sonucunu bir `const`'a ata ve IDE'de üzerine gelerek TS'in ne tip çıkardığına
bak. Üçünü de yorum satırı olarak yaz.

Sonra boş bir dizi (`[]`) ile çağırmayı dene. Çıkan tipi de yorum olarak yaz — mantıklı mı?

---

## Egzersiz 2 — generic tip

`ApiResponse<T>` tipini tanımla: `data: T`, `success: boolean`, `timestamp: Date`.

İki değişken oluştur:
- `productResponse` — tek bir `Product` taşısın
- `customerListResponse` — bir `Customer[]` taşısın

`logResponse<T>(response: ApiResponse<T>): void` fonksiyonu yaz; `success` ve `timestamp`'i
bassın, `data`'yı da bassın. İkisiyle de çağır.

Fonksiyonun içinde `response.data.name` yazmayı dene. Hatayı gör ve **neden** hata verdiğini
yorum satırı olarak açıkla (ipucu: `T` hakkında ne biliyorsun?).

---

## Egzersiz 3 — constraint

`getById<T>(items: T[], id: number): T | undefined` yaz — dizide `id`'si eşleşen elemanı
bulsun.

Önce constraint **yazmadan** dene, aldığın hatayı yorum satırına kopyala. Sonra `extends`
ile gereken constraint'i ekle.

`products` ve `customers` üzerinde çağır, sonuçları bas. Var olmayan bir id ile de çağır.

Yorum satırı olarak yaz: Bu fonksiyonun C# imzası nasıl olurdu?

---

## Egzersiz 4 — `keyof` constraint

`pluck<T, K extends keyof T>(items: T[], key: K): T[K][]` yaz — dizideki her elemanın
verilen alanını toplayıp dönsün.

Çağır ve sonuçları bas:
- `pluck(products, "name")`
- `pluck(products, "price")`
- `pluck(customers, "email")`

Her sonucun tipini IDE'de kontrol edip yorum satırı olarak yaz — hepsi aynı mı?

Son olarak `pluck(products, "stock")` yazmayı dene, hatayı yorum satırına kopyala ve satırı
`@ts-expect-error` ile işaretle.
