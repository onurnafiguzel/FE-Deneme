# 07 — Egzersizler

`cozum.ts` içine yaz. Çalıştırma: `npm run 07` — Tip kontrolü: `npm run check`

---

## Egzersiz 1 — `typeof` ve truthiness tuzağı

`formatValue(value: string | number | boolean): string` yaz:
- string ise büyük harf
- number ise iki ondalıklı (`toFixed(2)`)
- boolean ise `"evet"` / `"hayır"`

Beş kez çağır ve bas: `"klavye"`, `42.5`, `true`, `false`, **`0`**.

Sonra ikinci bir fonksiyon yaz — `describeStock(stock?: number): string`:
- ilk versiyonda `if (stock)` kullan (`stockTruthy`)
- ikinci versiyonda `if (stock !== undefined)` kullan (`stockStrict`)

İkisini de üç değerle çağır: `5`, `0`, `undefined`. Çıktıda `0` satırlarını karşılaştır.
Hangisi yanlış cevap verdi ve neden? Yorum satırı olarak yaz.

---

## Egzersiz 2 — `in` ile daraltma

İki tip tanımla (ortak bir `kind` alanı **koyma**):

```
IndividualCustomer -> fullName: string, tckn: string
CorporateCustomer  -> fullName: string, taxNumber: string, companyName: string
```

`Customer` tipini bu ikisinin union'ı olarak tanımla.

`customerTitle(customer: Customer): string` yaz — bireysel müşteride `fullName`,
kurumsal müşteride `companyName` dönsün. `in` operatörünü kullan.

Her iki tipten birer nesne oluşturup çağır.

`in` kontrolünden **önce** `customer.companyName` yazmayı dene, hatayı yorum satırına
kopyala.

Son olarak yorum satırı olarak yaz: Bu iki tipe `kind` alanı ekleseydin (konu 02) ne
kazanırdın? `in` yaklaşımının zayıf tarafı ne?

---

## Egzersiz 3 — `instanceof` ve runtime sınırı

`formatDate(value: Date | string): string` yaz — `Date` ise `toISOString()`, string ise
olduğu gibi dönsün. İkisiyle de çağır.

Sonra şunu dene ve hatayı yorum satırına kopyala:

```ts
type Product = { id: number; name: string };
const something: unknown = { id: 1, name: "klavye" };
if (something instanceof Product) { }
```

Neden `Date` ile çalışıp `Product` ile çalışmadığını yorum satırı olarak açıkla.
(İpucu: konu 03'te generic'ler için konuştuğumuz aynı sebep.)

---

## Egzersiz 4 — type guard fonksiyonu

Bir API'den ham veri geldiğini varsay:

```ts
const rawValid   = '{"id":1,"name":"klavye","price":1200}';
const rawInvalid = '{"id":"bir","title":"klavye"}';
```

`Product` tipini tanımla (`id: number`, `name: string`, `price: number`).

`isProduct(value: unknown): value is Product` type guard'ını yaz — üç alanın varlığını ve
tipini kontrol etsin.

`parseProduct(raw: string): string` yaz:
- `JSON.parse` sonucunu `unknown` olarak al
- `isProduct` ile kontrol et
- geçerliyse `"<name> - <price> TL"`, değilse `"gecersiz veri"` dön

İkisiyle de çağır ve bas.

Ek denemeler:
1. `JSON.parse` sonucunu `unknown` yerine doğrudan kullanıp `.name` yazmayı dene, hatayı
   yorum satırına kopyala.
2. Aynı değişkeni `any` olarak tiple ve `.name` yaz — bu sefer hata veriyor mu?
   `unknown` ile `any` arasındaki farkı yorum satırı olarak yaz.
3. `isProduct`'ın gövdesini sadece `return true;` yap ve `rawInvalid` ile çalıştır.
   `npm run check` ne diyor, `npm run 07` ne diyor? İkisi arasındaki farkı yorum satırı
   olarak yaz, sonra gövdeyi geri al.
