# 05 — Egzersizler

`cozum.ts` içine yaz. Çalıştırma: `npm run 05` — Tip kontrolü: `npm run check`

Kaynak tip (egzersizlerin hepsi bundan türeyecek):

```
Product -> id: number, name: string, price: number, stock: number, description?: string
```

Bir de `products` dizisi hazırla (en az 3 ürün).

---

## Egzersiz 1 — `Omit` ve `Pick`

İki tip türet:
- `CreateProductDto` — `Product`'tan `id` hariç her şey
- `ProductListItem` — `Product`'tan sadece `id` ve `name`

`createProduct(dto: CreateProductDto): Product` fonksiyonu yaz — gelen dto'ya bir `id`
üretip (sabit sayı yeter) tam bir `Product` dönsün.

`toListItem(product: Product): ProductListItem` fonksiyonu yaz.

İkisini de çağır ve sonuçları bas.

Sonra `CreateProductDto` nesnesine `id` alanı eklemeyi dene, hatayı yorum satırına kopyala.

**Tuzak denemesi:** `Omit<Product, "stok">` (yazım hatası, doğrusu "stock") yazıp bir
değişken oluştur. Derleyici şikayet etti mi? Sonra aynı hatayı `Pick<Product, "stok">` ile
yap. İki davranış farkını yorum satırı olarak açıkla.

---

## Egzersiz 2 — `Partial` ile patch

`UpdateProductDto` tipini `Partial<Product>` olarak türet.

`patchProduct(product: Product, changes: UpdateProductDto): Product` yaz — spread ile
birleştirip yeni bir `Product` dönsün (orijinali değiştirme).

Üç kez çağır ve her seferinde hem eskisini hem yenisini bas:
1. Sadece `price` değiştir
2. Sadece `stock` ve `description` değiştir
3. Boş nesne `{}` gönder

Yorum satırı olarak yaz: C#'ta bu işi nasıl yapıyordun?

---

## Egzersiz 3 — `Record` ile literal union eşlemesi

`OrderStatus` tipini tanımla: `"pending" | "paid" | "shipped" | "cancelled"`.

`statusLabels` adında bir `Record<OrderStatus, string>` oluştur, dört durumun Türkçe
etiketini içersin.

`statusLabel(status: OrderStatus): string` fonksiyonu yaz — `switch` **kullanma**, doğrudan
`statusLabels`'tan oku. Dördünü de bas.

Sonra iki deneme yap, ikisinin de hatasını yorum satırına kopyala:
1. `statusLabels`'tan `cancelled` satırını sil
2. `statusLabels`'a `refunded: "iade"` satırı ekle

Yorum satırı olarak yaz: Bu iki hatayı C#'ta `Dictionary<OrderStatus, string>` ile ne zaman
öğrenirdin?

---

## Egzersiz 4 — `Required` ile varsayılan doldurma

Bu tipi tanımla:

```
ProductQuery -> pageSize?: number, sortBy?: string, onlyInStock?: boolean
```

`withDefaults(query: ProductQuery): Required<ProductQuery>` yaz — eksik alanları
varsayılanlarla doldursun (`20`, `"name"`, `false`). `??` kullan, `||` değil.

İki kez çağır: boş nesne `{}` ile ve `{ pageSize: 50, onlyInStock: false }` ile. Sonuçları bas.

İkinci çağrıda `onlyInStock: false` gönderdiğine dikkat et — çıktıda `false` mu kaldı?
`??` yerine `||` yazsaydın ne olurdu? Yorum satırı olarak yaz.

Son olarak: `withDefaults({}).pageSize.toFixed(2)` yazabildiğini gör. Aynı şeyi ham
`ProductQuery` üzerinde yazmayı dene, hatayı yorum satırına kopyala.
