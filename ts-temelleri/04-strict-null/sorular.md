# 04 — Egzersizler

`cozum.ts` içine yaz. Çalıştırma: `npm run 04` — Tip kontrolü: `npm run check`

---

## Egzersiz 1 — `?` ile `| undefined` farkı

İki tip tanımla:

```
CustomerA -> id: number, fullName: string, phone?: string
CustomerB -> id: number, fullName: string, phone: string | undefined
```

Her ikisinden de `phone` alanını **hiç yazmadan** birer nesne oluşturmayı dene.
Hangisi derlendi, hangisi hata verdi? Hatayı yorum satırına kopyala ve hata vereni
derlenecek şekilde düzelt.

Sonra yorum satırı olarak cevapla: Bu ikisinden hangisi C#'taki `public string? Phone`
property'sine daha yakın?

---

## Egzersiz 2 — `??` ve `||` tuzağı

Bu tipi tanımla:

```
Order -> id: number, total: number, discount?: number, note?: string
```

İki `Order` oluştur:
- `order1` — `discount` alanı hiç yok
- `order2` — `discount: 0` (müşteri indirim hak etmedi, ama bu geçerli bir değer)

`describeDiscount(order: Order): string` fonksiyonu yaz. İçinde iki değişken hesapla:

```
const withOr = order.discount || 10;
const withNullish = order.discount ?? 10;
```

İkisini de bas. Her iki order için de çağır.

`order2` için çıkan iki sonuca bak. Neden farklılar? Bir yorum satırıyla açıkla ve
hangisinin doğru davranış olduğunu yaz.

---

## Egzersiz 3 — optional chaining ile iç içe alanlar

Şu tipleri tanımla:

```
Address       -> city: string, district: string
OrderCustomer -> id: number, fullName: string, address?: Address
FullOrder     -> id: number, total: number, customer?: OrderCustomer
```

`getCity(order: FullOrder): string` fonksiyonu yaz — müşterinin şehrini dönsün, zincirin
herhangi bir yeri eksikse `"bilinmiyor"` dönsün. `?.` ve `??` kullan, tek satırda yazabilirsin.

Üç `FullOrder` oluştur ve üçüyle de çağır:
1. `customer` ve `address` dolu
2. `customer` var ama `address` yok
3. `customer` hiç yok

Sonra `?.` kullanmadan aynı fonksiyonu `if`'lerle yazmayı dene (adı `getCityVerbose` olsun).
Kaç satır tuttuğunu karşılaştır.

---

## Egzersiz 4 — `!` yerine daralt

Egzersiz 3'teki `FullOrder`'lardan bir dizi oluştur.

`findOrderTotal(orders: FullOrder[], id: number): string` fonksiyonu yaz — `find` ile
siparişi bulup toplamını metin olarak dönsün, bulunamazsa `"sipariş yok"`.

Önce `find`'ın sonucunu doğrudan `order.total` diye kullanmayı dene. Hatayı yorum satırına
kopyala.

Sonra iki çözümü de yaz:
- `!` ile susturulmuş hali (`findOrderTotalUnsafe`)
- `if` ile daraltılmış doğru hali (`findOrderTotal`)

Her ikisini de **var olmayan bir id** ile çağır ve `npm run 04` çalıştır. İkisi arasındaki
farkı çıktıda gör, ne olduğunu yorum satırı olarak yaz.

> İpucu: `Unsafe` olan runtime'da patlayacak. Programın geri kalanının çalışmasını
> istiyorsan o çağrıyı `try/catch` içine al.
